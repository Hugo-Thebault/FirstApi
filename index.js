import Fastify from 'fastify';
import { registerPostRoutes } from './controllers/post.js';
import { authentification } from './controllers/auth.js';
import { registerAuthMiddlewares } from './middlewares/auth.js';
import { registerErrorMiddleware } from './middlewares/error.js';
import FastifyAuth from '@fastify/auth';
import FastifySwagger from '@fastify/swagger';
import FastifySwaggerUi from '@fastify/swagger-ui';


// import FastifyCors from '@fastify/cors';

// fastify.register(FastifyCors, {
//     origin: process.env.NODE_ENV == 'production' ? 'example.com' : '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// });

const fastify = Fastify({
    logger: true,
    ajv: {
        customOptions: {removeAdditional:true}
    }
})

await fastify.register(FastifySwagger, {
    openapi: {
        components: {
            securitySchemes: {
                token: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
    },
});

await fastify.register(FastifySwaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'list'
    }
});

await fastify.register(FastifyAuth);

fastify.get('/', async function handler (request, reply) {
    return {hello: 'world' }
});

registerErrorMiddleware(fastify);
registerAuthMiddlewares(fastify);
authentification(fastify);
registerPostRoutes(fastify);

try {
    await fastify.listen({ port:3000 })
} catch(err) {
    fastify.log.error(err)
    process.exit(1)
}

await fastify.ready();