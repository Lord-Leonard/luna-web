import { router } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import {createContext} from "$lib/trpc/context";

export const handle: Handle = createTRPCHandle({
    router,
    createContext,
    onError: ({ type, path, error }) =>
        console.error(`Encountered error while trying to process ${type} @ ${path}:`, error)
});
