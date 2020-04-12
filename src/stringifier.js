function pad00(n) {
  return `00${n}`.slice(-2);
}

export function stringifyTime(t) {
  const ms = t.toFixed(2).slice(-2);
  const s = (t | 0) % 60;
  const m = (t / 60 | 0) % 60;
  const h = t / 3600 | 0;
  return `${h}:${pad00(m)}:${pad00(s)}.${ms}`;
}

export function stringifyEffect(eff) {
  if (eff.name === 'banner') {
    return `Banner;${eff.delay};${eff.leftToRight};${eff.fadeAwayWidth}`;
  }
  return `${eff.name.replace(/^\w/, (x) => x.toUpperCase())};${eff.y1};${eff.y2};${eff.delay};${eff.fadeAwayHeight}`;
}

export function stringifyEvent(event, format) {
  return format.map((fmt) => {
    const value = event[fmt];
    if (fmt === 'Start' || fmt === 'End') {
      return stringifyTime(value);
    }
    if (/^Margin/.test(fmt)) {
      return value || '0000';
    }
    if (fmt === 'Effect') {
      return value ? stringifyEffect(value) : '';
    }
    if (fmt === 'Text') {
      return value.raw;
    }
    return value;
  }).join();
}

export function stringify({ info, styles, events }) {
  return [
    '[Script Info]',
    ...Object.keys(info).map((key) => `${key}: ${info[key]}`),
    '',
    '[V4+ Styles]',
    `Format: ${styles.format.join(', ')}`,
    ...styles.style.map((style) => `Style: ${styles.format.map((fmt) => style[fmt]).join()}`),
    '',
    '[Events]',
    `Format: ${events.format.join(', ')}`,
    ...[]
      .concat(...['Comment', 'Dialogue'].map((type) => (
        events[type.toLowerCase()].map((dia) => ({
          start: dia.Start,
          end: dia.End,
          string: `${type}: ${stringifyEvent(dia, events.format)}`,
        }))
      )))
      .sort((a, b) => (a.start - b.start) || (a.end - b.end))
      .map((x) => x.string),
    '',
  ].join('\n');
}
