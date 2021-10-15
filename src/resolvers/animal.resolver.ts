import { Ctx, Query, Resolver } from 'type-graphql';
import { Animal } from '../entities';
import { MyContext } from '../utils/types';

@Resolver(() => Animal)
export class AnimalResolver {
    /**
     * Returns all animal types in the DB
     */
    @Query(() => [Animal])
    async animals(@Ctx() { em }: MyContext): Promise<Animal[]> {
        return em.getRepository(Animal).findAll();
    }
}
