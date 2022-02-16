const { strictEqual } = require('assert')
const model = require('@rdfjs/data-model')
const dataset = require('@rdfjs/dataset')
const namespace = require('@rdfjs/namespace')
const { describe, it } = require('mocha')
const equals = require('../equals')

const ns = namespace('http://example.org/')
const rdf = { ...model, ...dataset }

describe('equals', () => {
  it('returns true if both datasets are empty', () => {
    const dataset1 = rdf.dataset()
    const dataset2 = rdf.dataset()

    strictEqual(equals(dataset1, dataset2), true)
  })

  it('return true if both datasets contain the same quads', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.objectA)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.objectB)
    const dataset1 = rdf.dataset([quad1, quad2])
    const dataset2 = rdf.dataset([quad1, quad2])

    strictEqual(equals(dataset1, dataset2), true)
  })

  it('return false if dataset a contains a quad not in dataset b', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.objectA)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.objectB)
    const dataset1 = rdf.dataset([quad1, quad2])
    const dataset2 = rdf.dataset([quad1])

    strictEqual(equals(dataset1, dataset2), false)
  })

  it('return false if dataset b contains a quad not in dataset a', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.objectA)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.objectB)
    const dataset1 = rdf.dataset([quad1])
    const dataset2 = rdf.dataset([quad1, quad2])

    strictEqual(equals(dataset1, dataset2), false)
  })

  it('return false if dataset a and dataset b contain the same amount of quads but different content', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.objectA)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.objectB)
    const dataset1 = rdf.dataset([quad1])
    const dataset2 = rdf.dataset([quad2])

    strictEqual(equals(dataset1, dataset2), false)
  })
})
