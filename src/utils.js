export function difference(a, b) {
  const result = new Set(a)

  for (const item of b) {
    if (a.has(item)) {
      result.delete(item)
    }
  }

  return result
}

export function union(a, b) {
  const result = new Set(a)

  for (const item of b) {
    result.add(item)
  }

  return result
}
