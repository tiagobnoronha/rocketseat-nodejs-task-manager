import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./util/build-route-path.js";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const newTask = {
        id: randomUUID(),
        ...req.body,
        completed_at: null,
        created_at: Date.now(),
        updated_at: Date.now()
      }

      database.insert("tasks", newTask);

      return res.writeHead(201).end();

    }

  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (_, res) => {
      const tasks = database.select('tasks')

      return res.end(JSON.stringify({ tasks }))
    }
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
