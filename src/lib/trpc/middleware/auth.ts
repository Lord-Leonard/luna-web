import { trpc } from '$lib/trpc/trpc'
import {TRPCError} from '@trpx/server'

export const auth = trpc.middleware(async ({next, ctx}) => {
    if (!ctx.userId) throw TRPCError({code: 'UNAUTHORIZED'})
    return next();
})