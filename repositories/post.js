import {prisma} from '../services/db.js';
import { NotFoundError } from '../utils/error.js';

export const PostRepository = { 

    // Récupérer tous les post //
    getPosts: async (page, limit) => {
        const posts = await prisma.post.findMany({
            skip: (page-1) * limit,
            take: limit,
            include: {
                author: true
            }
        })
        if(!posts) {
            throw new NotFoundError('Posts not found')
        }
        return posts;
    },
    // Récupérer tous les post //


    // Récupérer un post en fonction de l'ID //
    getPost: async (id) => {
        const post = await prisma.post.findUnique({
            where: {
                id:id
            },
            include: {
                author: true,
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
        if(!post) {
            throw new NotFoundError('Post not found')
        }
        return post;
    },
    // Récupérer un post en fonction de l'ID //


    // Créer un post //
    createPost: async (post) => {
        const newPost = await prisma.post.create({
            data: post
        })
        return newPost;
    },
    // Créer un post //


    // Modifier un post existant //
    updatePost: async (id, post, authId) => {
        const oldpost = await prisma.post.findUnique({
            where: {
                id:id
            }
        });
        
        if(authId != oldpost.authorId) {
            throw new NotAuthorizedError("This is not ur post !")
        }
        
        if(!oldpost) {
            throw new NotFoundError('Old post not found')
        }
        const updatedPost = await prisma.post.update({
            data : post,
            where: {
                id:id
            },
            include: {
                author: true
            }
        })
        return updatedPost;
    },
    // Modifier un post existant //

    // Ajouter une catégorie à un poste //
    addCategoryPost: async (idCategory, id) => {
        const post = await prisma.post.findUnique({
            where: {
                id:id
            }
        })
        const category = await prisma.category.findUnique({
            where: {
                id:idCategory
            }
        })
        if(!post || !category) {
            throw new Error("marche pas !!!")
        }

        const postCategory = await prisma.CategoriesOnPosts.create({
            data: {
                postid: id,
                categoryid: idCategory
            }
        })
        return 
    },
    // Ajouter une catégorie à un poste //

    // Supprimer un post existant //
    deletePost: async (id, authId) => {
        const oldpost = await prisma.post.findUnique({
            where: {
                id:id
            }
        });

        if(!oldpost) {
            throw new NotFoundError('Post not found')
        }

        if(authId != oldpost.authorId) {
            throw new NotAuthorizedError("This is not ur post !")
        }

        const deleted = await prisma.post.delete({
            where: {
                id: id
            },
            include: {
                author: true
            }
        });
        return deleted;
    }
};
    // Supprimer un post existant //