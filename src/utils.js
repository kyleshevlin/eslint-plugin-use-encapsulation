function difference(a, b) {
  const result = new Set(a)

  for (const item of b) {
    if (a.has(item)) {
      result.delete(item)
    }
  }

  return result
}

function union(a, b) {
  const result = new Set(a)

  for (const item of b) {
    result.add(item)
  }

  return result
}

module.exports = {
  difference,
  union,
}
