const canonize = require('rdf-canonize')

function toCanonical (dataset) {
  return canonize.canonize([...dataset], { algorithm: 'URDNA2015' })
}

module.exports = toCanonical
