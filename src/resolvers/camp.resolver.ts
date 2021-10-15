import { Ctx, Query, Resolver } from 'type-graphql';
import { Camp } from '../entities';
import { MyContext } from '../utils/types';

@Resolver(() => Camp)
export class CampResolver {
    @Query(() => [Camp])
    async camps(@Ctx() { em }: MyContext): Promise<Camp[]> {
        return em.getRepository(Camp).findAll();
    }
}
