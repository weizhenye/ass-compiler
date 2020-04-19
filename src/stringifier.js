import { stylesFormat, eventsFormat } from './utils.js';

export function stringifyInfo(info) {
  return Object.keys(info).map((key) => `${key}: ${info[key]}`).join('\n');
}

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
  if (!eff) return '';
  if (eff.name === 'banner') {
    return `Banner;${eff.delay};${eff.leftToRight};${eff.fadeAwayWidth}`;
  }
  return `${eff.name.replace(/^\w/, (x) => x.toUpperCase())};${eff.y1};${eff.y2};${eff.delay};${eff.fadeAwayHeight}`;
}

export function stringifyEvent(event) {
  const m0 = '0000';
  return [
    event.Layer,
    stringifyTime(event.Start),
    stringifyTime(event.End),
    event.Style,
    event.Name,
    event.MarginL || m0,
    event.MarginR || m0,
    event.MarginV || m0,
    stringifyEffect(event.Effect),
    event.Text.raw,
  ].join();
}

export function stringify({ info, styles, events }) {
  return [
    '[Script Info]',
    stringifyInfo(info),
    '',
    '[V4+ Styles]',
    `Format: ${stylesFormat.join(', ')}`,
    ...styles.style.map((style) => `Style: ${stylesFormat.map((fmt) => style[fmt]).join()}`),
    '',
    '[Events]',
    `Format: ${eventsFormat.join(', ')}`,
    ...[]
      .concat(...['Comment', 'Dialogue'].map((type) => (
        events[type.toLowerCase()].map((dia) => ({
          start: dia.Start,
          end: dia.End,
          string: `${type}: ${stringifyEvent(dia)}`,
        }))
      )))
      .sort((a, b) => (a.start - b.start) || (a.end - b.end))
      .map((x) => x.string),
    '',
  ].join('\n');
}
