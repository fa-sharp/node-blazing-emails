//@ts-check
import fp from 'fastify-plugin'
import sensible from '@fastify/sensible'
import fastifyStatic from '@fastify/static'
import fastifyFormbody from '@fastify/formbody'
import fastifyView from '@fastify/view'
import { Eta } from 'eta'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default fp(async function (fastify, opts) {
  
  // Templating with Eta
  fastify.register(fastifyView, {
    engine: { eta: new Eta() },
    root: path.join(__dirname, "../templates"),
  })

  // Static files served from /public
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/public',
  })

  // Support HTML form requests
  fastify.register(fastifyFormbody)

  // Utility functions
  fastify.register(sensible)
})
