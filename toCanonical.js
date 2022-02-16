const URDNA2015Sync = require('rdf-canonize/lib/URDNA2015Sync.js')

function toCanonical (dataset) {
  return new URDNA2015Sync().main(dataset)
}

module.exports = toCanonical
