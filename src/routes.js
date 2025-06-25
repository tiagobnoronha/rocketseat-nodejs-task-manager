import { buildRoutePath } from "./util/build-route-path.js";



export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => res.end("Rota não implementada")

  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => res.end("Rota não implementada")
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => res.end(JSON.stringify({ method: 'put', params: req.params }))
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => res.end(JSON.stringify({ method: 'delete', params: req.params }))
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => res.end(JSON.stringify({ method: 'patch', params: req.params }))
  },
]
