/* global describe, expect, test */

const deleteMatch = require('../deleteMatch')
const dataset = require('@rdfjs/dataset')
const model = require('@rdfjs/data-model')
const namespace = require('@rdfjs/namespace')

const ns = namespace('http://example.org/')
const rdf = { ...model, ...dataset }

describe('deleteMatch', () => {
  test('returns the given dataset instance', () => {
    const dataset = rdf.dataset()

    const result = deleteMatch(dataset)

    expect(result).toBe(dataset)
  })

  test('deletes only quads which pass the subject match pattern', () => {
    const quad1 = rdf.quad(ns.subject1, ns.predicate, ns.object, ns.graph)
    const quad2 = rdf.quad(ns.subject2, ns.predicate, ns.object, ns.graph)
    const dataset = rdf.dataset([ quad1, quad2 ])

    deleteMatch(dataset, ns.subject3, null, null, null)

    expect(dataset.size).toBe(2)

    deleteMatch(dataset, ns.subject2, null, null, null)

    expect(dataset.size).toBe(1)
  })

  test('deletes only quads which pass the predicate match pattern', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate1, ns.object, ns.graph)
    const quad2 = rdf.quad(ns.subject, ns.predicate2, ns.object, ns.graph)
    const dataset = rdf.dataset([ quad1, quad2 ])

    deleteMatch(dataset, null, ns.predicate3, null, null)

    expect(dataset.size).toBe(2)

    deleteMatch(dataset, null, ns.predicate2, null, null)

    expect(dataset.size).toBe(1)
  })

  test('deletes only quads which pass the object match pattern', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.object1, ns.graph)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.object2, ns.graph)
    const dataset = rdf.dataset([ quad1, quad2 ])

    deleteMatch(dataset, null, null, ns.object3, null)

    expect(dataset.size).toBe(2)

    deleteMatch(dataset, null, null, ns.object2, null)

    expect(dataset.size).toBe(1)
  })

  test('deletes only quads which pass the graph match pattern', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.object, ns.graph1)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.object, ns.graph2)
    const dataset = rdf.dataset([ quad1, quad2 ])

    deleteMatch(dataset, null, null, null, ns.graph3)

    expect(dataset.size).toBe(2)

    deleteMatch(dataset, null, null, null, ns.graph2)

    expect(dataset.size).toBe(1)
  })
})
