import fp from 'fastify-plugin'
import { Engine } from "mrml/nodejs/mrml_wasm.js";

export default fp(async function (fastify, opts) {

  const mrmlEngine = new Engine();

  fastify.decorate('email', async function ({ name, appName, tasks }) {
    const mjml = await fastify.view("task-email.mjml", {
      name, appName, tasks
    });
    const htmlResult = await mrmlEngine.toHtmlAsync(mjml);

    if (htmlResult.type === 'error') {
      fastify.log.error(htmlResult, "Error while rendering email")
      return null;
    }

    return htmlResult.content;
  })
})
