import { FilterQuery } from '@mikro-orm/core';
import { endOfDay, startOfDay } from 'date-fns';
import { GraphQLResolveInfo } from 'graphql';
import fieldsToRelations from 'graphql-fields-to-relations';
import { Arg, Ctx, Info, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Spotting, User } from '../entities';
import { MyContext } from '../utils/types';
import { SpottingValidator } from '../validators/spotting.validator';

@Resolver(() => Spotting)
export class SpottingResolver {
    /**
     * Query to get all spottings
     * @param animals Optional animal ID to get spottings from
     * @returns All spottings
     */
    @Query(() => [Spotting])
    async spottings(
        @Arg('animals', () => [Int], { nullable: true }) animals: number[],
        @Arg('excludedAnimals', () => [Int], { nullable: true }) excludedAnimals: number[],
        @Arg('date', () => Date, { defaultValue: new Date() }) date: Date,
        @Info() info: GraphQLResolveInfo,
        @Ctx() { em }: MyContext
    ): Promise<Spotting[]> {
        const relationPaths = fieldsToRelations(info);
        const filter = generateAnimalFilter(animals, excludedAnimals, date);
        const spottings = await em.getRepository(Spotting).find(filter, relationPaths);
        return spottings;
    }

    /**
     * Mutation to create a spotting
     * @param id User ID (fingerprint)
     * @param input Spotting input
     * @returns Created spotting
     */
    @Mutation(() => Spotting)
    async createSpotting(
        @Arg('id', () => String) id: string,
        @Arg('input', () => SpottingValidator) input: SpottingValidator,
        @Info() info: GraphQLResolveInfo,
        @Ctx() { em, req }: MyContext
    ): Promise<Spotting> {
        const relationPaths = fieldsToRelations(info);

        // Attempt to finder user with fingerprint
        let user = await em.getRepository(User).findOne({
            id
        });
        if (!user) {
            // If there is no user yet, we must create one
            const newUser = em.create(User, {
                id
            });
            // Save user
            await em.persistAndFlush(newUser);
            user = newUser;
        }

        // Set cookie for next time
        req.session.data.id = user.id;

        // Create pin
        const spotting = em.create(Spotting, {
            user,
            animal: input.animal,
            location: {
                lat: input.lat,
                lon: input.lon
            },
            description: input.description
        });
        await em.persistAndFlush(spotting);

        return em.getRepository(Spotting).findOneOrFail(
            {
                id: spotting.id
            },
            relationPaths
        );
    }
}

const generateAnimalFilter = (animals?: number[], excludedAnimals?: number[], date?: Date): FilterQuery<Spotting> => {
    let filter: FilterQuery<Spotting> = {};
    // Add date filter if given
    if (date) {
        // Get start & end of day from date
        const start = startOfDay(date);
        const end = endOfDay(date);
        // Filter between these 2 timestamps
        filter = {
            createdAt: {
                $gte: start,
                $lte: end
            }
        };
    }
    // No animals or exludedAnimals => no filter
    if (!animals && !excludedAnimals) {
        return filter;
    }
    // If there are animals, but no excludedAnimals, we can just filter on animals
    if (animals && !excludedAnimals) {
        return {
            ...filter,
            animal: {
                id: {
                    $in: animals
                }
            }
        };
    }
    // If there are excludedAnimals, but no animals, we can just filter on excludedAnimals
    if (!animals && excludedAnimals) {
        return {
            ...filter,
            animal: {
                id: {
                    $nin: excludedAnimals
                }
            }
        };
    }
    // If there are both animals and excludedAnimals, we need to filter on both
    return {
        ...filter,
        animal: {
            id: {
                $in: animals,
                $nin: excludedAnimals
            }
        }
    };
};
