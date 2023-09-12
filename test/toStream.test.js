const { strictEqual } = require('assert')
const { promisify } = require('util')
const model = require('@rdfjs/data-model')
const dataset = require('@rdfjs/dataset')
const namespace = require('@rdfjs/namespace')
const isStream = require('is-stream')
const { describe, it } = require('mocha')
const { finished } = require('readable-stream')
const toStream = require('../toStream')

const ns = namespace('http://example.org/')
const rdf = { ...model, ...dataset }

describe('toStream', () => {
  it('returns a Readable Stream', () => {
    const dataset = rdf.dataset()

    const result = toStream(dataset)

    strictEqual(isStream.readable(result), true)
  })

  it('stream emits all quads of the dataset', async () => {
    const quad1 = rdf.quad(ns.subject1, ns.predicate, ns.object, ns.graph)
    const quad2 = rdf.quad(ns.subject2, ns.predicate, ns.object, ns.graph)
    const dataset = rdf.dataset([quad1, quad2])

    const stream = toStream(dataset)
    const quads = []

    stream.on('data', quad => quads.push(quad))

    await promisify(finished)(stream)

    strictEqual(quads.length, 2)
    strictEqual(quads[0].equals(quad1), true)
    strictEqual(quads[1].equals(quad2), true)
  })
})
