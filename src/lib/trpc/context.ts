import { JWT_SECRET } from '$env/static/private';
import type {RequestEvent} from '@sveltejs/kit';
import type {inferAsyncReturnType} from '@trpc/server';
import jwt from 'jsonwebtoken';

// we're not using the event parameter is this example,
// hence the eslint-disable rule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext(event: RequestEvent) {
    try{
        const token = event.cookies.get('jwt');

        const { id: userID } = jwt.verify(token || '', JWT_SECRET) as { id: string };

        return { userId };
    } catch {
        return { userId: ''};
    }
}

export type Context = inferAsyncReturnType<typeof createContext>;
