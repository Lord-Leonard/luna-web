import prisma from '$lib/prisma';
import { logger } from '$lib/trpc/middleware/logger';
import { trpc } from '$lib/trpc/trpc';
import { z } from 'zod';

export const authors = trpc.router({
    list: trpc.procedure
        .use(logger)
        .input(z.string().optional())
        .query(({ input }) =>
            prisma.author.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    updatedAt: true,
                    _count: { select: { books: true } }
                },
                orderBy: { updatedAt: 'desc' },
                where: input
                    ? { OR: [{ firstName: { contains: input } }, { lastName: { contains: input } }] }
                    : undefined
            })
        ),

    loadOptions: trpc.procedure.use(logger).query(() =>
        prisma.author
            .findMany({
                select: { id: true, firstName: true, lastName: true },
                orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }]
            })
            .then((authors) =>
                authors.map(({ id, firstName, lastName }) => ({
                    label: `${firstName} ${lastName}`,
                    value: id
                }))
            )
    ),

    load: trpc.procedure
        .use(logger)
        .input(z.string())
        .query(({ input }) =>
            prisma.author.findUniqueOrThrow({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    bio: true,
                    updatedAt: true,
                },
                where: { id: input }
            })
        ),

    save: trpc.procedure
        .use(logger)
        .input(
            z.object({
                id: z.string().nullable(),
                firstName: z.string().min(3).max(50),
                lastName: z.string().min(3).max(50),
                bio: z.string().nullable()
            })
        )
        .mutation(async ({ input: { id, ...rest } }) => {
            if (id) {
                await prisma.author.update({
                    data: { ...rest },
                    where: { id }
                });
            } else {
                await prisma.author.create({
                    data: { ...rest }
                });
            }
        }),

    delete: trpc.procedure
        .use(logger)
        .input(z.string())
        .mutation(async ({ input: id }) => {
            await prisma.author.delete({ where: { id } });
        })
});
