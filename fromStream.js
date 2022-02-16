const { promisify } = require('util')
const { finished } = require('readable-stream')

async function fromStream (dataset, stream) {
  stream.on('data', quad => dataset.add(quad))

  await promisify(finished)(stream)

  return dataset
}

module.exports = fromStream
