import fs from 'fs'
const middlewares = {}
const files = fs.readdirSync(__dirname)
for (let file of files) {
  if (file !== 'index.js') {
    const fileName = file.split('.')[0]
    middlewares[fileName] = require('./' + file)
  }
}

export default middlewares
