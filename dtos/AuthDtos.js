// DTO pour le fichier //
const PrivateUser = {
    type: 'object',
    properties: {
        email: {type: 'string'},
        username: {type: 'string'},
        password: {type: 'string'},
    },
    required: ['email', 'username', 'password']
}

export const PublicUser = {
    type: 'object',
    properties: {
        id: {type: 'number'},
        username: {type: 'string'},
    },
    required: ['id', 'username']
}

const LoginUser = {
    type: 'object',
    properties: {
        id: {type: 'number'},
        username: {type: 'string'},
        token: {type: 'string'}
    },
    required: ['id', 'username', 'token']
}
// DTO pour le fichier //


// DTO pour les controllers //
export const CreateUserDto = {
    body: PrivateUser,
    response: {
        200: PublicUser,
    }
};

export const GetUserByIdDto = {
    response: {
        200: PublicUser
    }
}

export const GetUserByEmailPasswordDto = {
    body: {
        type: 'object',
        properties: {
            email: {type: 'string'},
            password: {type: 'string'}
        },
        required: ['email', 'password']
    },
    response: {
        200: LoginUser
    }
}
// DTO pour les controllers //