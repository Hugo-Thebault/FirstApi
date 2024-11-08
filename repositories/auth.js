import {prisma} from '../services/db.js';
import { NotFoundError } from '../utils/error.js';

export const UserRepository = {
    getUserId: async (id) => {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if(!user) {
            throw new NotFoundError('User not found')
        }
        return user;
    },

    getUserEP: async (email, password) => {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password
            }
        });
        if(!user) {
            throw new NotFoundError('User not found')
        }
        return user;
    },

    createUser: async (user) => {
        const newUser = await prisma.user.create({
            data: user
        });
        return newUser;
    }
}