const { Readable } = require('readable-stream')

function toStream (dataset) {
  const iterator = dataset[Symbol.iterator]()

  const stream = new Readable({
    objectMode: true,
    read: () => {
      for (;;) {
        const quad = iterator.next().value

        if (!quad) {
          stream.push(null)

          return
        }

        if (!stream.push(quad)) {
          return
        }
      }
    }
  })

  return stream
}

module.exports = toStream
