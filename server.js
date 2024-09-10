//@ts-check

import Fastify from 'fastify'
import closeWithGrace from 'close-with-grace'
import appService from './app.js'

const app = Fastify({
  logger: process.env.NODE_ENV === "production" ? { level: "info" } : {
    level: "debug",
    transport: {
      target: "pino-pretty"
    }
  }
})

app.register(appService)

closeWithGrace(
  { 
    delay: Number(process.env.FASTIFY_CLOSE_GRACE_DELAY || 500),
    logger: app.log
  }, 
  async function ({ signal, err, manual }) {
    if (err) {
      app.log.error(err)
    }
    await app.close()
  }
)

// Start listening.
app.listen({ port: Number(process.env.PORT || 3000) }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
