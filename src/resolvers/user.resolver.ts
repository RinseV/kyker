import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../entities';
import { MyContext } from '../utils/types';

@Resolver(() => User)
export class UserResolver {
    /**
     * Mutation to log user in, creates a new user if not already registered
     * @param fingerprint Unique fingerprint from browser
     * @returns Logged in user
     */
    @Mutation(() => User)
    async login(@Arg('fingerprint', () => String) fingerprint: string, @Ctx() { em, req }: MyContext): Promise<User> {
        // Check if user with fingerprint already exists
        const user = await em.getRepository(User).findOne({ id: fingerprint });
        // If user already exists, log in
        if (user) {
            req.session.data.id = user.id;
            return user;
        }

        // If not, create a new user
        const newUser = em.create(User, { id: fingerprint });
        await em.persistAndFlush(newUser);

        // Login user
        req.session.data.id = newUser.id;

        // Return user
        return newUser;
    }
}
