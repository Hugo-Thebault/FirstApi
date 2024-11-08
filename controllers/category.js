import { CategoryRepository } from '../repositories/category.js';
import { createCategoryDto, updateCategoryDto, deleteCategoryDto, getCategoriesDto, getOneCategoryDto } from '../dtos/CategoryDtos.js';

export function RegisterCategoryRoute(fastify) {

    fastify.get('/categories', { schema: getCategoriesDto },
    async function getCategories(request, reply) {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        return await CategoryRepository.getCategories(page, limit);
    });

    fastify.get('/categories/:id', { schema: getOneCategoryDto},
    async function getOneCategoryDto(request, reply) {
        const id = parseInt(request.params.id);
        return await CategoryRepository.getCategoriesPost(id);
    });

    fastify.post('/categories', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: createCategoryDto
    }, 
    async function createCategory (request, reply) {
        const newCategory = request.body;
        return await CategoryRepository.createCategory(newCategory);
    });

    fastify.put('/categories/:id',{
        preHandler: fastify.auth([fastify.authUser]),
        schema: updateCategoryDto
    }, 
    async function updateCategory (request, reply) {   
        const id = parseInt(request.params.id);
        const body = request.body;
        return await CategoryRepository.updatePost(id, body);
    });

    fastify.delete('/categories/:id', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: deleteCategoryDto}, 
    async function deleteCategory (request, reply) {
        const id = parseInt(request.params.id);
        return await PostRepository.deletePost(id);
    });
}