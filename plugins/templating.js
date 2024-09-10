//@ts-check
import fp from 'fastify-plugin'
import fastifyView from '@fastify/view'
import { Eta } from 'eta'
import { fileURLToPath } from 'url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default fp(async function (fastify, opts) {
  fastify.register(fastifyView, {
    engine: { eta: new Eta() },
    root: path.join(__dirname, "../templates"),
  })
})
