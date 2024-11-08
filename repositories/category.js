import {prisma} from '../services/db.js';
import { NotFoundError } from '../utils/error.js';

export const CategoryRepository = { 

    // Récupérer toutes les catégories //
    getCategories: async (page, limit) => {
        const categories = await prisma.category.findMany({
            skip: (page-1) * limit,
            take: limit,
        })
        if(!categories) {
            throw new NotFoundError('Categories not found')
        }
        return categories;
    },
    // Récupérer toutes les catégories //

    // Récupérer les catégories d'un post //
    getCategoriesPost: async (id) => {
        const post = await prisma.post.findUnique({
            where: {
                id:id
            }
        })
    },
    // Récupérer les catégories d'un post //

    // Créer une catégorie //
    createCategory: async (category) => {
        const newCategory = await prisma.category.create({
            data: category
        })
        return newCategory;
    },
    // Créer une catégorie //
    

    // Modifier une catégorie existante //
    updateCategory: async (id, category) => {
        const oldcategory = await prisma.category.findUnique({
            where: {
                id:id
            }
        });
        
        if(!oldcategory) {
            throw new NotFoundError('Category not found')
        }
        const updatedcategory = await prisma.category.update({
            data : category,
            where: {
                id:id
            }
        })
        return updatedcategory;
    },
    // Modifier une catégorie existante //


    // Supprimer une catégorie existante //
    deleteCategory: async (id) => {
        const oldcategory = await prisma.category.findUnique({
            where: {
                id:id
            }
        });

        if(!oldcategory) {
            throw new NotFoundError('Category not found')
        }

        const deleted = await prisma.category.delete({
            where: {
                id: id
            }
        });
        return deleted;
    }
};
    // Supprimer un post existant //