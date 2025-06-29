import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./util/build-route-path.js";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const nowStr = (new Date()).toISOString()

      const newTask = {
        id: randomUUID(),
        ...req.body,
        completed_at: null,
        created_at: nowStr,
        updated_at: nowStr
      }

      database.insert("tasks", newTask);

      return res.writeHead(201).end();

    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const search = req.query.search ?? "";
      const tasks = database.select('tasks')
        .filter(
          (task) =>
            task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search)
        )

      return res.end(JSON.stringify({ tasks }))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const task = database.select('tasks').find((tsk) => tsk.id === id);
      const updated_at = (new Date()).toISOString()


      if (task) {

        const { title = task.title, description = task.description } = req.body;
        database.update('tasks', id, {
          title,
          description,
          updated_at
        })

        return res.writeHead(204).end();
      }

      return res.writeHead(404).end()

    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      return database.delete('tasks', id) ? res.writeHead(204).end() : res.writeHead(404).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;
      const nowStr = (new Date()).toISOString()

      const task = this.database.select().filter()
      return database.update('tasks', id, {
        completed_at: nowStr,
        updated_at: nowStr
      }) ? res.writeHead(204).end() : res.writeHead(404).end()
    }
  },
]
