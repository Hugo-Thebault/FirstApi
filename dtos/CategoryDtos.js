const Category = {
    type: 'object',
    properties: {
        title: {type: 'string'},
    },
    required: ['title']
}

export const ExistingCategory = {
    type: 'object',
    properties: {
        id: {type: 'number'},
        title: {type: 'string'},
    },
    required: ['title']
}

export const getCategoriesDto = {
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
            items: ExistingCategory
        }
    }
}

export const getOneCategoryDto = {
    response: {
        200: ExistingCategory
    }
}

export const createCategoryDto = {
    security: [{ token: []}],
    body: Category,
    response: {
        200: ExistingCategory
    }
}

export const updateCategoryDto = {
    security: [{ token: []}],
    body: Category,
    response: {
        200: ExistingCategory
    }
}

export const deleteCategoryDto = {
    security: [{ token: []}],
    response: {
        200: ExistingCategory
    }
}