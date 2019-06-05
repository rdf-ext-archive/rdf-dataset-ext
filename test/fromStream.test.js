/* global describe, expect, test */

const fromStream = require('../fromStream')
const dataset = require('@rdfjs/dataset')
const model = require('@rdfjs/data-model')
const namespace = require('@rdfjs/namespace')
const { Readable } = require('readable-stream')

const ns = namespace('http://example.org/')
const rdf = { ...model, ...dataset }

describe('fromStream', () => {
  test('returns the given dataset instance via Promise', async () => {
    const stream = new Readable({
      objectMode: true,
      read: () => { stream.push(null) }
    })
    const dataset = rdf.dataset()

    const result = await fromStream(dataset, stream)

    expect(result).toBe(dataset)
  })

  test('imports quads from stream', async () => {
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

    expect(dataset.size).toBe(2)
    expect(dataset.has(quad1)).toBe(true)
    expect(dataset.has(quad2)).toBe(true)
  })

  test('forwards stream errors', async () => {
    const stream = new Readable({
      objectMode: true,
      read: () => { stream.emit('error', new Error('test')) }
    })
    const dataset = rdf.dataset()

    await expect(fromStream(dataset, stream)).rejects.toThrow('test')
  })
})
