import { Ctx, Query, Resolver } from 'type-graphql';
import { Gate } from '../entities';
import { MyContext } from '../utils/types';

@Resolver(() => Gate)
export class GateResolver {
    @Query(() => [Gate])
    async gates(@Ctx() { em }: MyContext): Promise<Gate[]> {
        return em.getRepository(Gate).findAll();
    }
}
