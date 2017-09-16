import { compileText } from './text.js';
import { assign } from '../utils.js';

export function compileDialogues({ info, styles, dialogues }) {
  const results = [];
  for (let i = 0; i < dialogues.length; i++) {
    const dia = dialogues[i];
    if (dia.Start >= dia.End) {
      continue;
    }
    const stl = styles[dia.Style].style;
    const timer = info.Timer / 100 || 1;
    const compiledText = compileText({ styles, name: dia.Style, parsed: dia.Text.parsed });
    const alignment = compiledText.alignment || stl.Alignment;
    results.push(assign({
      layer: dia.Layer,
      start: dia.Start / timer,
      end: dia.End / timer,
      // reset style by `\r` will not effect margin and alignment
      margin: {
        left: dia.MarginL || stl.MarginL,
        right: dia.MarginR || stl.MarginR,
        vertical: dia.MarginV || stl.MarginV,
      },
      effect: dia.Effect,
    }, compiledText, { alignment }));
  }
  return results.sort((a, b) => a.start - b.start || a.end - b.end);
}
