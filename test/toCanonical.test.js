const { strictEqual } = require('assert')
const model = require('@rdfjs/data-model')
const dataset = require('@rdfjs/dataset')
const namespace = require('@rdfjs/namespace')
const { describe, it } = require('mocha')
const toCanonical = require('../toCanonical')

const ns = namespace('http://example.org/')
const rdf = { ...model, ...dataset }

describe('toCanonical', () => {
  it('returns the canonical representation of the dataset', () => {
    const blankNode = rdf.blankNode()
    const quad1 = rdf.quad(ns.subject1, ns.predicate, blankNode, ns.graph)
    const quad2 = rdf.quad(blankNode, ns.predicate, ns.object, ns.graph)
    const dataset = rdf.dataset([quad1, quad2])

    const result = toCanonical(dataset)

    strictEqual(result, [
      '<http://example.org/subject1> <http://example.org/predicate> _:c14n0 <http://example.org/graph> .',
      '_:c14n0 <http://example.org/predicate> <http://example.org/object> <http://example.org/graph> .',
      ''
    ].join('\n'))
  })

  it('returns an empty string for an empty dataset', () => {
    const dataset = rdf.dataset()

    const result = toCanonical(dataset)

    strictEqual(result, '')
  })
})
