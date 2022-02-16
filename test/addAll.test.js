const { strictEqual } = require('assert')
const model = require('@rdfjs/data-model')
const dataset = require('@rdfjs/dataset')
const namespace = require('@rdfjs/namespace')
const { describe, it } = require('mocha')
const addAll = require('../addAll')

const ns = namespace('http://example.org/')
const rdf = { ...model, ...dataset }

describe('addAll', () => {
  it('should add all quads from the given dataset', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.objectA)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.objectB)
    const dataset1 = rdf.dataset([quad1])
    const dataset2 = rdf.dataset([quad2])

    addAll(dataset1, dataset2)

    strictEqual(dataset1.size, 2)
    strictEqual(dataset1.has(quad1), true)
    strictEqual(dataset1.has(quad2), true)
  })

  it('should not touch the added quads', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.objectA)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.objectB)
    const dataset1 = rdf.dataset([quad1])
    const dataset2 = rdf.dataset([quad2])

    addAll(dataset1, dataset2)

    strictEqual(dataset2.size, 1)
    strictEqual(dataset2.has(quad2), true)
  })

  it('should return the dataset instance the quads where added to', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.objectA)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.objectB)

    const dataset1 = rdf.dataset([quad1])
    const dataset2 = rdf.dataset([quad2])
    const dataset3 = addAll(dataset1, dataset2)

    strictEqual(dataset3, dataset1)
  })
})
