import { UserRepository } from '../repositories/auth.js';
import { CreateUserDto, GetUserByEmailPasswordDto, GetUserByIdDto } from '../dtos/AuthDtos.js';
import JWT from 'jsonwebtoken';
import { createHash } from 'crypto';

export function authentification(fastify){

    fastify.post('/signup', {schema : CreateUserDto}, async function signUp (request, reply) {
        const body = request.body;
        body.password = createHash('sha1')
            .update(body.password+process.env.PASSWORD_SALT)
            .digest('hex');
        const user = await UserRepository.createUser(body);
        return user;
    });

    fastify.post('/login', {schema : GetUserByEmailPasswordDto}, async function logIn (request, reply) {
        const body = request.body;
        body.password = createHash('sha1')
            .update(body.password+process.env.PASSWORD_SALT)
            .digest('hex');
        const user = await UserRepository.getUserEP(body.email, body.password);
        if(!user){
            throw new Error('Invalid credentials');
        }
        user.token = JWT.sign({ id: user.id }, process.env.JWT_SECRET);
        return user
    });

    // fastify.post('/user', async function getUsers (request, reply) {
    //     const page = parseInt(request.query.page) || 1;
    //     const limit = parseInt(request.query.limit) || 10;
    //     return await AuthRepository.getUsers(page, limit);
    // })

    fastify.get('/user/:id', {schema : GetUserByIdDto}, async function getUserId (request, reply) {
        const id = parseInt(request.params.id);
        return await UserRepository.getUserId(id);
    })
}