import { QueryOrder } from '@mikro-orm/core';
import { Ctx, Query, Resolver } from 'type-graphql';
import { Animal } from '../entities';
import RateLimit from '../middleware/RateLimit';
import { MyContext } from '../utils/types';

@Resolver(() => Animal)
export class AnimalResolver {
    /**
     * Returns all animal types in the DB
     */
    @Query(() => [Animal])
    @RateLimit()
    async animals(@Ctx() { em }: MyContext): Promise<Animal[]> {
        return em.getRepository(Animal).findAll({
            orderBy: {
                name: QueryOrder.ASC
            }
        });
    }
}
