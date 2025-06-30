import { parse } from 'csv-parse'
export async function csv(req, _) {
  if (req.headers['content-type'] === 'text/plain') {
    req.body = []
    const parser = req.pipe(
      parse({
        delimiter: ",",
        columns: true
      })
    )

    for await (const record of parser) {
      req.body.push(record)
    }

  }
}
