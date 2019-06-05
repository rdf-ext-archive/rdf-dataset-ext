function equals (a, b) {
  if (a.size !== b.size) {
    return false
  }

  for (const quad of a) {
    if (!b.has(quad)) {
      return false
    }
  }

  return true
}

module.exports = equals
