/**
 * @param {import("fastify").FastifyInstance} fastify
 */
export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { name } = request.query;
    return reply.view("index.html", { name })
  })

  fastify.post("/", async function (request, reply) {
    const { name, appName } = request.body;
    const tasks = [];
    [1, 2, 3].forEach(taskNum => {
      const description = request.body["description" + taskNum];
      if (description) {
        tasks.push({
          description,
          priority: Number(request.body["priority" + taskNum]) || 1,
          dueDate: formatDate(request.body["dueDate" + taskNum])
        })
      }
    })

    const renderStartTime = performance.now();
    const html = await fastify.email({ name, appName, tasks });
    if (!html) {
      return reply.internalServerError("Error rendering email!"); 
    }
    const renderTime = performance.now() - renderStartTime;
    
    return reply.view("result.html", {
      renderTime,
      appName,
      name,
      tasks,
      emailHtml: html
    });
  })
}


const dateFormatter = new Intl.DateTimeFormat(undefined, {
  timeZone: "UTC",
  month: "numeric",
  day: "numeric",
  weekday: 'short'
})

function formatDate(dateHtmlInputString) {
  const date = new Date(dateHtmlInputString || Date.now())
  return dateFormatter.format(date);
}