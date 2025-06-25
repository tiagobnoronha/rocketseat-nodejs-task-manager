import http from 'node:http'
import { routes } from './routes.js';
import { json } from './middlewares/json.js';
import { Database } from './database.js';
import { buildRoutePath } from './util/build-route-path.js';

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  const route = routes.find(
    route =>
      route.method === method && route.path.test(url)
  );

  if (route) {
    const routeParams = req.url.match(route.path)

    req.params = { ...routeParams.groups }

    return route.handler(req, res)
  }

  return res.writeHead(404).end();
})

server.listen(3333)

