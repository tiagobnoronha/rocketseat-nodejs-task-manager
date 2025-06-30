export async function json(req, res) {
  if (req.headers['content-type'] === 'application/json') {
    const buffers = []

    for await (const chunk of req) {
      buffers.push(chunk)
    }

    console.log(req.headers['content-type'])

    try {
      req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
      req.body = null
    }

    res.setHeader('Content-type', 'application/json')
  }
}
