import { parse } from '../parser/index.js';
import { compileDialogues } from './dialogues.js';
import { compileStyles } from './styles.js';

export function compile(text, options = {}) {
  const tree = parse(text);
  const info = Object.assign(options.defaultInfo || {}, tree.info);
  const styles = compileStyles({
    info,
    style: tree.styles.style,
    defaultStyle: options.defaultStyle || {},
  });
  return {
    info,
    width: info.PlayResX * 1 || null,
    height: info.PlayResY * 1 || null,
    wrapStyle: /^[0-3]$/.test(info.WrapStyle) ? info.WrapStyle * 1 : 2,
    collisions: info.Collisions || 'Normal',
    styles,
    dialogues: compileDialogues({
      styles,
      dialogues: tree.events.dialogue,
    }),
  };
}
