export function registerErrorMiddleware(fastify) {
    fastify.setErrorHandler((error, request, reply) => {
        if(error.name === "NotFoundError") {
            reply.code(404).send({ ok: false, message: error.message });
        } else if(error.name === "NotAuthorizedError") {
            reply.code(401).send({ ok: false, message: error.message });
        } else {
            console.error(error);
            reply.code(500).send({ ok: false, message: error.message});
        }
    });
}