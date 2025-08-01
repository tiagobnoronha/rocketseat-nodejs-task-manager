import http from 'node:http'
import { routes } from './routes.js';
import { json } from './middlewares/json.js';

import { extractQueryParams } from './util/extract-query-params.js';
import { csv } from './middlewares/csv.js';


const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)
  await csv(req, res)

  const route = routes.find(
    route =>
      route.method === method && route.path.test(url)
  );

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups;
    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end("Invalid operation.");

})

server.listen(3333)

