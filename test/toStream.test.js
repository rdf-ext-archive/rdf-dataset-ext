/* global describe, expect, test */

const toStream = require('../toStream')
const dataset = require('@rdfjs/dataset')
const model = require('@rdfjs/data-model')
const { isReadable } = require('isstream')
const namespace = require('@rdfjs/namespace')
const { finished } = require('readable-stream')
const { promisify } = require('util')

const ns = namespace('http://example.org/')
const rdf = { ...model, ...dataset }

describe('toStream', () => {
  test('returns a Readable Stream', () => {
    const dataset = rdf.dataset()

    const result = toStream(dataset)

    expect(isReadable(result)).toBe(true)
  })

  test('stream emits all quads of the dataset', async () => {
    const quad1 = rdf.quad(ns.subject1, ns.predicate, ns.object, ns.graph)
    const quad2 = rdf.quad(ns.subject2, ns.predicate, ns.object, ns.graph)
    const dataset = rdf.dataset([ quad1, quad2 ])

    const stream = toStream(dataset)
    const quads = []

    stream.on('data', quad => quads.push(quad))

    await promisify(finished)(stream)

    expect(quads.length).toBe(2)
    expect(quads[0].equals(quad1)).toBe(true)
    expect(quads[1].equals(quad2)).toBe(true)
  })
})
