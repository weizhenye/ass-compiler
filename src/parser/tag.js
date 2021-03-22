import { parseDrawing } from './drawing.js';

const numTags = [
  'b', 'i', 'u', 's', 'fsp',
  'k', 'K', 'kf', 'ko', 'kt',
  'fe', 'q', 'p', 'pbo', 'a', 'an',
  'fscx', 'fscy', 'fax', 'fay', 'frx', 'fry', 'frz', 'fr',
  'be', 'blur', 'bord', 'xbord', 'ybord', 'shad', 'xshad', 'yshad',
];

const numRegexs = numTags.map((nt) => ({ name: nt, regex: new RegExp(`^${nt}-?\\d`) }));

export function parseTag(text) {
  const tag = {};
  for (let i = 0; i < numRegexs.length; i++) {
    const { name, regex } = numRegexs[i];
    if (regex.test(text)) {
      tag[name] = text.slice(name.length) * 1;
      return tag;
    }
  }
  if (/^fn/.test(text)) {
    tag.fn = text.slice(2);
  } else if (/^r/.test(text)) {
    tag.r = text.slice(1);
  } else if (/^fs[\d+-]/.test(text)) {
    tag.fs = text.slice(2);
  } else if (/^\d?c&?H?[0-9a-f]+|^\d?c$/i.test(text)) {
    const [, num, color] = text.match(/^(\d?)c&?H?(\w*)/);
    tag[`c${num || 1}`] = color && `000000${color}`.slice(-6);
  } else if (/^\da&?H?[0-9a-f]+/i.test(text)) {
    const [, num, alpha] = text.match(/^(\d)a&?H?(\w\w)/);
    tag[`a${num}`] = alpha;
  } else if (/^alpha&?H?[0-9a-f]+/i.test(text)) {
    [, tag.alpha] = text.match(/^alpha&?H?([0-9a-f]+)/i);
    tag.alpha = `00${tag.alpha}`.slice(-2);
  } else if (/^(?:pos|org|move|fad|fade)\([^)]+/.test(text)) {
    const [, key, value] = text.match(/^(\w+)\((.*?)\)?$/);
    tag[key] = value
      .trim()
      .split(/\s*,\s*/)
      .map(Number);
  } else if (/^i?clip\([^)]+/.test(text)) {
    const p = text
      .match(/^i?clip\((.*?)\)?$/)[1]
      .trim()
      .split(/\s*,\s*/);
    tag.clip = {
      inverse: /iclip/.test(text),
      scale: 1,
      drawing: null,
      dots: null,
    };
    if (p.length === 1) {
      tag.clip.drawing = parseDrawing(p[0]);
    }
    if (p.length === 2) {
      tag.clip.scale = p[0] * 1;
      tag.clip.drawing = parseDrawing(p[1]);
    }
    if (p.length === 4) {
      tag.clip.dots = p.map(Number);
    }
  } else if (/^t\(/.test(text)) {
    const p = text
      .match(/^t\((.*?)\)?$/)[1]
      .trim()
      .replace(/\\.*/, (x) => x.replace(/,/g, '\n'))
      .split(/\s*,\s*/);
    if (!p[0]) return tag;
    tag.t = {
      t1: 0,
      t2: 0,
      accel: 1,
      tags: p[p.length - 1]
        .replace(/\n/g, ',')
        .split('\\')
        .slice(1)
        .map(parseTag),
    };
    if (p.length === 2) {
      tag.t.accel = p[0] * 1;
    }
    if (p.length === 3) {
      tag.t.t1 = p[0] * 1;
      tag.t.t2 = p[1] * 1;
    }
    if (p.length === 4) {
      tag.t.t1 = p[0] * 1;
      tag.t.t2 = p[1] * 1;
      tag.t.accel = p[2] * 1;
    }
  }

  return tag;
}
