# rdf-dataset-ext

[![build status](https://img.shields.io/github/actions/workflow/status/rdf-ext/rdf-dataset-ext/test.yaml?branch=master)](https://github.com/rdf-ext/rdf-dataset-ext/actions/workflows/test.yaml)
[![npm version](https://img.shields.io/npm/v/rdf-dataset-ext.svg)](https://www.npmjs.com/package/rdf-dataset-ext)

Util functions for easier RDF/JS DatasetCore handling.

## Usage

All provided functions can be imported as properties of the package or directly from the file matching the function name.

Import `addAll` from property:

```
const { addAll } = require('rdf-dataset-ext')
```

Import `addAll` from file:

```
const addAll = require('rdf-dataset-ext/addAll')
```

### addAll(dataset, iterable)

Iterates over `iterable` and adds all quads to `dataset` by calling `.add` for each quad.
Returns the given `dataset`.

### deleteMatch(dataset, subject, predicate, object, graph)

Deletes all quads in the given `dataset` which match the given `subject`, `predicate`, `object`, `graph` pattern.
`.match` of `dataset` is used to find the matches and `.delete` to delete all matches.
Returns the given `dataset`.

### equals(a, b)

Tests if the datasets `a` and `b` contain the same quads without doing a normalization step beforehand.
That means Blank Node labels must also match.
The comparison is done by testing `.size` of both dataset for equality and by looping over all quads of `a` and check if `b` contains it using the `.has` method.
Returns `true` if both datasets are equal.
Otherwise `false` is returned. 

### async fromStream(dataset, stream)

Adds all quads from `stream` till the stream is finished.
Errors emitted by the stream are forwarded as Promise rejects.
Returns the given `dataset`.

### toCanonical(dataset)

Returns the canonical representation of the `dataset` as string.

### toStream(dataset)

Creates a Stream which emits all quads of the given `dataset`.
Returns the created stream.
