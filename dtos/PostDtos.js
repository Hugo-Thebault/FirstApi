import { PublicUser } from "./AuthDtos.js";
import { ExistingCategory } from "./CategoryDtos.js";

// DTO pour le fichier //
const ExistingPostDto = {
    type: 'object',
    properties: {
        id: {type: 'number'},
        title: {type: 'string'},
        content: {type: 'string'},
        author: PublicUser,
        categories: {
            type : 'array',
            items : {
                type : 'object',
                properties: {
                    category: ExistingCategory
                }
            }
        }
    },
    required: ['id', 'title', 'content', 'author', 'categories']
};
// DTO pour le fichier //


// DTO pour les controllers //
export const GetPostsDto = {
    querystring: {
        type: 'object',
        properties: {
            page: {type: 'number'},
            limit: {type: 'number'}
        }
    },
    response: {
        200: {
            type : 'array',
            items: ExistingPostDto
        }
    }
}

export const GetOnePostsDto = {
    response: {
        200: ExistingPostDto
    }
}

export const CreatePostDto = {
    security: [{ token: []}],
    body: {
        type: 'object',
        properties: {
            title: {type: 'string'},
            content: {type: 'string'},
        },
        required: ['title', 'content']
    },
    response: {
        200: ExistingPostDto
    }
};

export const UpdatePostsDto = {
    security: [{ token: []}],
    body: {
        type: 'object',
        properties: {
            title: {type: 'string'},
            content: {type: 'string'},
        },
    },
    response: {
        200: ExistingPostDto
    }
}

export const DeletePostsDto = {
    security: [{ token: []}],
    response: {
        200: ExistingPostDto
    }
}
// DTO pour les controllers //