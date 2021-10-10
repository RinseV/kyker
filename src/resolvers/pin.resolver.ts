import { GraphQLResolveInfo } from 'graphql';
import fieldsToRelations from 'graphql-fields-to-relations';
import { Arg, Ctx, Info, Mutation, Query, Resolver } from 'type-graphql';
import { Pin, User } from '../entities';
import { Animal } from '../utils/animals';
import { MyContext } from '../utils/types';
import { PinValidator } from '../validators/pin.validator';

@Resolver(() => Pin)
export class PinResolver {
    @Query(() => [Pin])
    async pins(
        @Arg('animals', () => [Animal], { nullable: true }) animals: Animal[],
        @Info() info: GraphQLResolveInfo,
        @Ctx() { em }: MyContext
    ): Promise<Pin[]> {
        const relationPaths = fieldsToRelations(info);
        const pins = await em.getRepository(Pin).find(
            {
                animal: {
                    $in: animals ? animals : undefined
                }
            },
            relationPaths
        );
        return pins;
    }

    @Mutation(() => Pin)
    async createPin(
        @Arg('id', () => String) id: string,
        @Arg('input', () => PinValidator) input: PinValidator,
        @Info() info: GraphQLResolveInfo,
        @Ctx() { em, req }: MyContext
    ): Promise<Pin> {
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
        const pin = em.create(Pin, {
            user,
            animal: input.animal,
            location: {
                lat: input.lat,
                lon: input.lon
            }
        });
        await em.persistAndFlush(pin);

        return em.getRepository(Pin).findOneOrFail(
            {
                id: pin.id
            },
            relationPaths
        );
    }
}
