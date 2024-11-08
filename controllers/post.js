import { PostRepository } from '../repositories/post.js';
import { CreatePostDto, GetPostsDto, GetOnePostsDto, DeletePostsDto, UpdatePostsDto } from '../dtos/PostDtos.js';

export function registerPostRoutes(fastify){

    fastify.get('/posts', {schema: GetPostsDto}, async function getPosts (request, reply) {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        return await PostRepository.getPosts(page, limit);
    });
    
    fastify.get('/posts/:id', {schema: GetOnePostsDto}, async function getPost (request, reply) {
        const id = parseInt(request.params.id);
        return await PostRepository.getPost(id);
    });

    fastify.post('/posts', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: CreatePostDto
    }, 
    async function createPost (request, reply) {
        const newPost = request.body;
        const userId = request.user.id;
        newPost.authorId = userId;
        return await PostRepository.createPost(newPost);
    });

    fastify.put('/posts/:id',{
        preHandler: fastify.auth([fastify.authUser]),
        schema: UpdatePostsDto
    }, 
    async function updatePost (request, reply) {
        const id = parseInt(request.params.id);
        const body = request.body;
        const Idlog = request.user.id;
        return await PostRepository.updatePost(id, body, Idlog);
    });

    // fastify.put('/postsCategory/:id', {
    //     preHandler: fastify.auth([fastify.authUser]),
    //     schema: UpdatePostsDto
    // },
    // async function addCategoryPost (request, reply) {
    //     const idPost = parseInt(request.params.id);
    //     const id
    // })

    fastify.delete('/posts/:id', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: DeletePostsDto}, 
    async function deletePost (request, reply) {
        const id = parseInt(request.params.id);
        const idlog = request.user.id;
        return await PostRepository.deletePost(id, idlog);
    });
}