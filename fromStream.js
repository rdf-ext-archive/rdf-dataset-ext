const { finished } = require('readable-stream')
const { promisify } = require('util')

async function fromStream (dataset, stream) {
  stream.on('data', quad => dataset.add(quad))

  await promisify(finished)(stream)

  return dataset
}

module.exports = fromStream
