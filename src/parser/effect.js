export function parseEffect(text) {
  const param = text
    .toLowerCase()
    .trim()
    .split(/\s*;\s*/);
  if (param[0] === 'banner') {
    return {
      name: param[0],
      delay: param[1] * 1 || 0,
      leftToRight: param[2] * 1 || 0,
      fadeAwayWidth: param[3] * 1 || 0,
    };
  }
  if (/^scroll\s/.test(param[0])) {
    return {
      name: param[0],
      y1: Math.min(param[1] * 1, param[2] * 1),
      y2: Math.max(param[1] * 1, param[2] * 1),
      delay: param[3] * 1 || 0,
      fadeAwayHeight: param[4] * 1 || 0,
    };
  }
  return null;
}
