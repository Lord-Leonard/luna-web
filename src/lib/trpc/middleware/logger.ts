import { trpc } from '$lib/trpc/trpc';

export const logger = trpc.middleware(async ({ path, type, next }) => {
    const start = Date.now();
    const result = await next();
    const ms = Date.now() - start;
    console.log(`${result.ok ? 'OK' : 'ERR'} ${type} ${path} - ${ms}ms`);
    return result;
});
