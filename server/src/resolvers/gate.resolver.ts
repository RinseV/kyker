import { Ctx, Query, Resolver } from 'type-graphql';
import { Gate } from '../entities';
import RateLimit from '../middleware/RateLimit';
import { MyContext } from '../utils/types';

@Resolver(() => Gate)
export class GateResolver {
    @Query(() => [Gate])
    @RateLimit()
    async gates(@Ctx() { em }: MyContext): Promise<Gate[]> {
        return em.getRepository(Gate).findAll();
    }
}
