import { UserRepository } from "../repositories/auth.js";
import JWT from 'jsonwebtoken';

export function registerAuthMiddlewares(fastify){
    
    fastify.decorate('authUser', async function (request, reply) {
        const authHeader = request.headers['authorization'];
    
        if(!authHeader) {
            reply.code(401).send({ error: 'Token not found'});
            return;
        }

        const token = authHeader.replace('Bearer ', '');

        try {
            const payload = JWT.verify(token, process.env.JWT_SECRET);
            const user = await UserRepository.getUserId(payload.id);

            if(!user) {
                reply.code(401).send({ error: 'User not found'});
                return;
            }

            request.user = user;
        } catch(err) {
            reply.code(401).send({ error: 'Invalid token'});
            return;
        }
    });

}