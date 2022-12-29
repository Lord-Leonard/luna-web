import {trpc} from '$lib/trpc/trpc';
import type {inferRouterInputs, inferRouterOutputs} from '@trpc/server';
import {authors} from "$lib/trpc/routes/authors";

export const router = trpc.router({
    authors
});


export type Router = typeof router;

// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
