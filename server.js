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
  },
  trustProxy: process.env.NODE_ENV === "production"
})

app.register(appService)

closeWithGrace({ delay: 500 }, async function ({ err }) {
    if (err) {
      app.log.error(err)
    }
    await app.close()
  }
)

// Start listening.
app.listen({ 
  port: Number(process.env.PORT || 3000),
  host: process.env.HOST || "localhost",
}, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
