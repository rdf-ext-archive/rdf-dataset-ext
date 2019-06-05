/* global describe, expect, test */

const dataset = require('@rdfjs/dataset')
const equals = require('../equals')
const model = require('@rdfjs/data-model')
const namespace = require('@rdfjs/namespace')

const ns = namespace('http://example.org/')
const rdf = { ...model, ...dataset }

describe('equals', () => {
  test('returns true if both datasets are empty', () => {
    const dataset1 = rdf.dataset()
    const dataset2 = rdf.dataset()

    expect(equals(dataset1, dataset2)).toBe(true)
  })

  test('return true if both datasets contain the same quads', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.objectA)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.objectB)
    const dataset1 = rdf.dataset([ quad1, quad2 ])
    const dataset2 = rdf.dataset([ quad1, quad2 ])

    expect(equals(dataset1, dataset2)).toBe(true)
  })

  test('return false if dataset a contains a quad not in dataset b', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.objectA)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.objectB)
    const dataset1 = rdf.dataset([ quad1, quad2 ])
    const dataset2 = rdf.dataset([ quad1 ])

    expect(equals(dataset1, dataset2)).toBe(false)
  })

  test('return false if dataset b contains a quad not in dataset a', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.objectA)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.objectB)
    const dataset1 = rdf.dataset([ quad1 ])
    const dataset2 = rdf.dataset([ quad1, quad2 ])

    expect(equals(dataset1, dataset2)).toBe(false)
  })

  test('return false if dataset a and dataset b contain the same amount of quads but different content', () => {
    const quad1 = rdf.quad(ns.subject, ns.predicate, ns.objectA)
    const quad2 = rdf.quad(ns.subject, ns.predicate, ns.objectB)
    const dataset1 = rdf.dataset([ quad1 ])
    const dataset2 = rdf.dataset([ quad2 ])

    expect(equals(dataset1, dataset2)).toBe(false)
  })
})
