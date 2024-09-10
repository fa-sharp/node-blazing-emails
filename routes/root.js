/**
 * @param {import("fastify").FastifyInstance} fastify
 */
export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { name } = request.query;
    return reply.view("index.html", { name })
  })
}
