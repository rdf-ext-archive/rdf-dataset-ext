/* global describe, expect, test */

const addAll = require('../addAll')
const dataset = require('@rdfjs/dataset')
const model = require('@rdfjs/data-model')
const namespace = require('@rdfjs/namespace')

const ns = namespace('http://example.org/')
const rdf = { ...model, ...dataset }

describe('addAll', () => {
  test('adds all quads from the given dataset', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.objectA)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.objectB)
    const dataset1 = rdf.dataset([ quad1 ])
    const dataset2 = rdf.dataset([ quad2 ])

    addAll(dataset1, dataset2)

    expect(dataset1.size).toBe(2)
    expect(dataset1.has(quad1)).toBe(true)
    expect(dataset1.has(quad2)).toBe(true)
  })

  test('doesn\'t touch the added quads', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.objectA)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.objectB)
    const dataset1 = rdf.dataset([ quad1 ])
    const dataset2 = rdf.dataset([ quad2 ])

    addAll(dataset1, dataset2)

    expect(dataset2.size).toBe(1)
    expect(dataset2.has(quad2)).toBe(true)
  })

  test('returns the dataset instance the quads where added to', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.objectA)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.objectB)

    const dataset1 = rdf.dataset([ quad1 ])
    const dataset2 = rdf.dataset([ quad2 ])
    const dataset3 = addAll(dataset1, dataset2)

    expect(dataset3).toBe(dataset1)
  })
})
