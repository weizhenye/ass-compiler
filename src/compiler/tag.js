import { compileDrawing } from './drawing.js';
import { assign } from '../utils.js';

const tTags = [
  'fs', 'clip',
  'c1', 'c2', 'c3', 'c4', 'a1', 'a2', 'a3', 'a4', 'alpha',
  'fscx', 'fscy', 'fax', 'fay', 'frx', 'fry', 'frz', 'fr',
  'be', 'blur', 'bord', 'xbord', 'ybord', 'shad', 'xshad', 'yshad',
];

export function compileTag(tag, key, presets = {}) {
  let value = tag[key];
  if (value === undefined) {
    return null;
  }
  if (key === 'pos' || key === 'org') {
    return value.length === 2 ? { [key]: { x: value[0], y: value[1] } } : null;
  }
  if (key === 'move') {
    const [x1, y1, x2, y2, t1 = 0, t2 = 0] = value;
    return value.length === 4 || value.length === 6
      ? { move: { x1, y1, x2, y2, t1, t2 } }
      : null;
  }
  if (key === 'fad' || key === 'fade') {
    if (value.length === 2) {
      const [t1, t2] = value;
      return { fade: { type: 'fad', t1, t2 } };
    }
    if (value.length === 7) {
      const [a1, a2, a3, t1, t2, t3, t4] = value;
      return { fade: { type: 'fade', a1, a2, a3, t1, t2, t3, t4 } };
    }
    return null;
  }
  if (key === 'clip') {
    const { inverse, scale, drawing, dots } = value;
    if (drawing) {
      return { clip: { inverse, scale, drawing: compileDrawing(drawing), dots } };
    }
    if (dots) {
      const [x1, y1, x2, y2] = dots;
      return { clip: { inverse, scale, drawing, dots: { x1, y1, x2, y2 } } };
    }
    return null;
  }
  if (/^[xy]?(bord|shad)$/.test(key)) {
    value = Math.max(value, 0);
  }
  if (key === 'bord') {
    return { xbord: value, ybord: value };
  }
  if (key === 'shad') {
    return { xshad: value, yshad: value };
  }
  if (/^c\d$/.test(key)) {
    return { [key]: value || presets[key] };
  }
  if (key === 'alpha') {
    return { a1: value, a2: value, a3: value, a4: value };
  }
  if (key === 'fr') {
    return { frz: value };
  }
  if (key === 'fs') {
    return {
      fs: /^\+|-/.test(value)
        ? (value * 1 > -10 ? (1 + value / 10) : 1) * presets.fs
        : value * 1,
    };
  }
  if (key === 'K') {
    return { kf: value };
  }
  if (key === 't') {
    const { t1, accel, tags } = value;
    const t2 = value.t2 || (presets.end - presets.start) * 1e3;
    const compiledTag = {};
    tags.forEach((t) => {
      const k = Object.keys(t)[0];
      if (~tTags.indexOf(k) && !(k === 'clip' && !t[k].dots)) {
        assign(compiledTag, compileTag(t, k, presets));
      }
    });
    return { t: { t1, t2, accel, tag: compiledTag } };
  }
  return { [key]: value };
}
