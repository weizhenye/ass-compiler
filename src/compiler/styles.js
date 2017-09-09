function parseStyleColor(color) {
  const [, a, c] = color.match(/&H(\w\w)?(\w{6})&?/);
  return [a || '00', c];
}

export function compileStyles({ info, style, format }) {
  const result = {};
  for (let i = 0; i < style.length; i++) {
    const stl = style[i];
    const s = {};
    for (let j = 0; j < format.length; j++) {
      const fmt = format[j];
      s[fmt] = (fmt === 'Name' || fmt === 'Fontname' || /Colour/.test(fmt)) ? stl[j] : stl[j] * 1;
    }
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
      q: /^[0-3]$/.test(info.WrapStyle) ? info.WrapStyle * 1 : 2,
    };
    result[s.Name] = { style: s, tag };
  }
  return result;
}
