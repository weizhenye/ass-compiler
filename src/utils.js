export /* istanbul ignore next */ function assign(target, ...sources) {
  if (Object.assign) {
    return Object.assign(target, ...sources);
  }
  for (let i = 0; i < sources.length; i++) {
    if (!sources[i]) continue;
    const keys = Object.keys(sources[i]);
    for (let j = 0; j < keys.length; j++) {
      // eslint-disable-next-line no-param-reassign
      target[keys[j]] = sources[i][keys[j]];
    }
  }
  return target;
}
