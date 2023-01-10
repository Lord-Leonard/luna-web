import {fail, redirect} from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import type {Action, Actions, PageServerLoad} from './$types'

import prisma from '$lib/prisma'

export const load: PageServerLoad = async () => {
    // todo
}

const login: Action = async ({cookies, request}) => {
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')

    if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        !username ||
        !password
    ) {
        return fail(400, {invalid: true})
    }

    const user = await prisma.user.findUnique({where: {username}})

    if (!user) {
        return fail(400, {credentials: true})
    }

    const userPassword = await bcrypt.compare(password, user.passwordHash)

    if (!userPassword) {
        return fail(400, {credentials: true})
    }

    // generate new auth token just in case
    const authenticatedUser = await prisma.user.update({
        where: {username: user.username},
        data: {userAuthToken: crypto.randomUUID()},
    })

    cookies.set('session', authenticatedUser.userAuthToken, {
        // send cookie for every page
        path: '/',
        // server side only cookie so you can't use `document.cookie`
        httpOnly: true,
        // only requests from same site can send cookies
        // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
        sameSite: 'strict',
        // only sent over HTTPS in production
        secure: process.env.NODE_ENV === 'production',
        // set cookie to expire after an hour
        maxAge: 60 * 60,
    })

    // redirect the user
    throw redirect(302, '/')
}

export const actions: Actions = {login}


// import { JWT_SECRET } from '$env/static/private';
// import prisma from '$lib/prisma';
// import { invalid } from '@sveltejs/kit';
// import { md5 } from 'hash-wasm';
// import jwt from 'jsonwebtoken';
// import type { Actions } from './$types';
//
// export const actions: Actions = {
//     default: async ({ request, cookies }) => {
//         try {
//             const data = await request.formData();
//             const email = data.get('email') as string;
//             const password = data.get('password') as string;
//
//             // 👇 replace this with a non-naiive hashing algorithm
//             const passwordHash = await md5(password);
//
//             const { id, name } = await prisma.user.findFirstOrThrow({
//                 where: { email, passwordHash },
//                 select: { id: true, name: true }
//             });
//
//             cookies.set('jwt', jwt.sign({ id, name }, JWT_SECRET), { path: '/' });
//
//             return { success: true };
//             // 👆 or, if we're using HTTP headers based auth, we could return the token,
//             // and let the client set the header on subsequent requests
//         } catch {
//             return invalid(401, { error: 'Authentication failed' });
//         }
//     }
// };
