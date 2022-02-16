const { rejects, strictEqual } = require('assert')
const model = require('@rdfjs/data-model')
const dataset = require('@rdfjs/dataset')
const namespace = require('@rdfjs/namespace')
const { describe, it } = require('mocha')
const { Readable } = require('readable-stream')
const fromStream = require('../fromStream')

const ns = namespace('http://example.org/')
const rdf = { ...model, ...dataset }

describe('fromStream', () => {
  it('returns the given dataset instance via Promise', async () => {
    const stream = new Readable({
      objectMode: true,
      read: () => {
        stream.push(null)
      }
    })
    const dataset = rdf.dataset()

    const result = await fromStream(dataset, stream)

    strictEqual(result, dataset)
  })

  it('imports quads from stream', async () => {
    const quad1 = rdf.quad(ns.subject1, ns.predicate, ns.object, ns.graph)
    const quad2 = rdf.quad(ns.subject2, ns.predicate, ns.object, ns.graph)
    const stream = new Readable({
      objectMode: true,
      read: () => {
        stream.push(quad1)
        stream.push(quad2)
        stream.push(null)
      }
    })
    const dataset = rdf.dataset()

    await fromStream(dataset, stream)

    strictEqual(dataset.size, 2)
    strictEqual(dataset.has(quad1), true)
    strictEqual(dataset.has(quad2), true)
  })

  it('forwards stream errors', async () => {
    const stream = new Readable({
      objectMode: true,
      read: () => {
        stream.emit('error', new Error('test'))
      }
    })
    const dataset = rdf.dataset()

    await rejects(fromStream(dataset, stream))
  })
})
