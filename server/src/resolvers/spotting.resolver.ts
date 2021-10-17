import { FilterQuery } from '@mikro-orm/core';
import { endOfDay, format, startOfDay, parse } from 'date-fns';
import { GraphQLResolveInfo } from 'graphql';
import fieldsToRelations from 'graphql-fields-to-relations';
import { Arg, Ctx, Info, Int, Mutation, Query, Resolver } from 'type-graphql';
import { ISO_DATE_FORMAT } from '../constants';
import { Animal, Spotting, User } from '../entities';
import { MyContext } from '../utils/types';
import { QueryDate } from '../validators/date.validator';
import { SpottingValidator } from '../validators/spotting.validator';

@Resolver(() => Spotting)
export class SpottingResolver {
    /**
     * Query to get all spottings
     * @param animals Optional animal ID to get spottings from
     * @param excludedAnimals Optional animal ID to exclude from spottings
     * @param date Optional date to get spottings from (as ISO8601 string)
     * @returns All spottings
     */
    @Query(() => [Spotting])
    async spottings(
        @Arg('animals', () => [Int], { nullable: true }) animals: number[],
        @Arg('excludedAnimals', () => [Int], { nullable: true }) excludedAnimals: number[],
        @Arg('date', () => QueryDate, { defaultValue: { date: format(new Date(), ISO_DATE_FORMAT) } }) date: QueryDate,
        @Info() info: GraphQLResolveInfo,
        @Ctx() { em }: MyContext
    ): Promise<Spotting[]> {
        const relationPaths = fieldsToRelations(info);
        const filter = generateAnimalFilter(excludedAnimals, date.date, animals);
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

        // Check if animal is disabled
        const animal = await em.getRepository(Animal).findOne({
            id: input.animal
        });
        if (!animal || animal.disabled) {
            throw new Error('Not allowed to create spottings for this animal');
        }
        // Create spotting
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

/**
 * Generates a filter for the given date and animals to include/exclude
 * @param excludedAnimals Animal IDs to exclude
 * @param date Date to search for spottings on
 * @param animals Animal IDs to include
 * @returns A filter for all spottings matching the given criteria
 */
const generateAnimalFilter = (
    excludedAnimals: number[] = [],
    date: string,
    animals?: number[]
): FilterQuery<Spotting> => {
    // Convert date string to Date
    const dateAsDate = parse(date, ISO_DATE_FORMAT, new Date());
    // Get start & end of day from date
    const start = startOfDay(dateAsDate);
    const end = endOfDay(dateAsDate);
    // Create filter with everything
    return {
        animal: {
            // We only want to include animals if they are not disabled
            disabled: false,
            // Depending on whether animals are given, we either include them or not
            id: animals
                ? {
                      $in: animals,
                      $nin: excludedAnimals
                  }
                : {
                      $nin: excludedAnimals
                  }
        },
        // We query between the start of the given day and the end of the given day
        createdAt: {
            $gte: start,
            $lte: end
        }
    };
};
