import { assign } from '../utils.js';

// same as Aegisub
// https://github.com/Aegisub/Aegisub/blob/master/src/ass_style.h
const DEFAULT_STYLE = {
  Name: 'Default',
  Fontname: 'Arial',
  Fontsize: '20',
  PrimaryColour: '&H00FFFFFF&',
  SecondaryColour: '&H000000FF&',
  OutlineColour: '&H00000000&',
  BackColour: '&H00000000&',
  Bold: '0',
  Italic: '0',
  Underline: '0',
  StrikeOut: '0',
  ScaleX: '100',
  ScaleY: '100',
  Spacing: '0',
  Angle: '0',
  BorderStyle: '1',
  Outline: '2',
  Shadow: '2',
  Alignment: '2',
  MarginL: '10',
  MarginR: '10',
  MarginV: '10',
  Encoding: '1',
};

/**
 * @param {String} color
 * @returns {Array} [AA, BBGGRR]
 */
export function parseStyleColor(color) {
  if (/^(&|H|&H)[0-9a-f]{6,}/i.test(color)) {
    const [, a, c] = color.match(/&?H?([0-9a-f]{2})?([0-9a-f]{6})/i);
    return [a || '00', c];
  }
  const num = parseInt(color, 10);
  if (!Number.isNaN(num)) {
    const min = -2147483648;
    const max = 2147483647;
    if (num < min) {
      return ['00', '000000'];
    }
    const aabbggrr = (min <= num && num <= max)
      ? `00000000${(num < 0 ? num + 4294967296 : num).toString(16)}`.slice(-8)
      : String(num).slice(0, 8);
    return [aabbggrr.slice(0, 2), aabbggrr.slice(2)];
  }
  return ['00', '000000'];
}

export function compileStyles({ info, style, defaultStyle }) {
  const result = {};
  const styles = [assign({}, DEFAULT_STYLE, defaultStyle, { Name: 'Default' })].concat(style);
  for (let i = 0; i < styles.length; i++) {
    const s = styles[i];
    // this behavior is same as Aegisub by black-box testing
    if (/^(\*+)Default$/.test(s.Name)) {
      s.Name = 'Default';
    }
    Object.keys(s).forEach((key) => {
      if (key !== 'Name' && key !== 'Fontname' && !/Colour/.test(key)) {
        s[key] *= 1;
      }
    });
    const [a1, c1] = parseStyleColor(s.PrimaryColour);
    const [a2, c2] = parseStyleColor(s.SecondaryColour);
    const [a3, c3] = parseStyleColor(s.OutlineColour);
    const [a4, c4] = parseStyleColor(s.BackColour);
    const tag = {
      fn: s.Fontname,
      fs: s.Fontsize,
      c1,
      a1,
      c2,
      a2,
      c3,
      a3,
      c4,
      a4,
      b: Math.abs(s.Bold),
      i: Math.abs(s.Italic),
      u: Math.abs(s.Underline),
      s: Math.abs(s.StrikeOut),
      fscx: s.ScaleX,
      fscy: s.ScaleY,
      fsp: s.Spacing,
      frz: s.Angle,
      xbord: s.Outline,
      ybord: s.Outline,
      xshad: s.Shadow,
      yshad: s.Shadow,
      fe: s.Encoding,
      q: /^[0-3]$/.test(info.WrapStyle) ? info.WrapStyle * 1 : 2,
    };
    result[s.Name] = { style: s, tag };
  }
  return result;
}
