function simplify(s) {
  if (s === 0 || s === 1) {
    return s;
  }

  const simplified = s.map(simplify);
  const uniqueValues = [...new Set(simplified)];

  if (uniqueValues.length === 1) {
    return uniqueValues[0];
  }

  return simplified;
}
