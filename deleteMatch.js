function deleteMatch (dataset, subject, predicate, object, graph) {
  const matches = dataset.match(subject, predicate, object, graph)

  for (const quad of matches) {
    dataset.delete(quad)
  }

  return dataset
}

module.exports = deleteMatch
