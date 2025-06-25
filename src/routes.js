


export const routes = [
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => res.end("Rota não implementada")

  },
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => res.end("Rota não implementada")
  },
  {
    method: 'PUT',
    path: '/tasks/:id',
    handler: (req, res) => res.end("Rota não implementada")
  },
  {
    method: 'DELETE',
    path: '/tasks/:id',
    handler: (req, res) => res.end("Rota não implementada")
  },
  {
    method: 'PATCH',
    path: '/tasks/:id/complete',
    handler: (req, res) => res.end("Rota não implementada")
  },
]
