function addAll (dataset, quads) {
  for (const quad of quads) {
    dataset.add(quad)
  }

  return dataset
}

module.exports = addAll
