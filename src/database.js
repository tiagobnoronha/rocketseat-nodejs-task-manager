import fs from 'node:fs/promises'

const databasePath = new URL('../bd.json', import.meta.url);

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => this.#database = JSON.parse(data))
      .catch(() => this.#persist())
  }

  #persist() {
    fs.writeFile(databasePath.pathname, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist();

    return data
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex === -1) return false

    const oldData = this.#database[table][rowIndex]
    this.#database[table][rowIndex] = { ...oldData, ...data }
    this.#persist()
    return true;

  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex === -1) return false

    this.#database[table].splice(rowIndex, 1);
    this.#persist()
    return true
  }



}
