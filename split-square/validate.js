function is_valid(s) {
  if (s === 0 || s === 1) {
    return true;
  }

  if (Array.isArray(s) && s.length === 4) {
    for (let i = 0; i < 4; i++) {
      if (!is_valid(s[i])) {
        return false;
      }
    }
    return true;
  }

  return false;
}
