const { strictEqual } = require('assert')
const model = require('@rdfjs/data-model')
const dataset = require('@rdfjs/dataset')
const namespace = require('@rdfjs/namespace')
const { describe, it } = require('mocha')
const deleteMatch = require('../deleteMatch')

const ns = namespace('http://example.org/')
const rdf = { ...model, ...dataset }

describe('deleteMatch', () => {
  it('returns the given dataset instance', () => {
    const dataset = rdf.dataset()

    const result = deleteMatch(dataset)

    strictEqual(result, dataset)
  })

  it('deletes only quads which pass the subject match pattern', () => {
    const quad1 = rdf.quad(ns.subject1, ns.predicate, ns.object, ns.graph)
    const quad2 = rdf.quad(ns.subject2, ns.predicate, ns.object, ns.graph)
    const dataset = rdf.dataset([quad1, quad2])

    deleteMatch(dataset, ns.subject3, null, null, null)

    strictEqual(dataset.size, 2)

    deleteMatch(dataset, ns.subject2, null, null, null)

    strictEqual(dataset.size, 1)
  })

  it('deletes only quads which pass the predicate match pattern', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate1, ns.object, ns.graph)
    const quad2 = rdf.quad(ns.subject, ns.predicate2, ns.object, ns.graph)
    const dataset = rdf.dataset([quad1, quad2])

    deleteMatch(dataset, null, ns.predicate3, null, null)

    strictEqual(dataset.size, 2)

    deleteMatch(dataset, null, ns.predicate2, null, null)

    strictEqual(dataset.size, 1)
  })

  it('deletes only quads which pass the object match pattern', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.object1, ns.graph)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.object2, ns.graph)
    const dataset = rdf.dataset([quad1, quad2])

    deleteMatch(dataset, null, null, ns.object3, null)

    strictEqual(dataset.size, 2)

    deleteMatch(dataset, null, null, ns.object2, null)

    strictEqual(dataset.size, 1)
  })

  it('deletes only quads which pass the graph match pattern', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.object, ns.graph1)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.object, ns.graph2)
    const dataset = rdf.dataset([quad1, quad2])

    deleteMatch(dataset, null, null, null, ns.graph3)

    strictEqual(dataset.size, 2)

    deleteMatch(dataset, null, null, null, ns.graph2)

    strictEqual(dataset.size, 1)
  })
})
