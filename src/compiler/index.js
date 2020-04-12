import { parse } from '../parser/index.js';
import { compileDialogues } from './dialogues.js';
import { compileStyles } from './styles.js';

export function compile(text, options = {}) {
  const tree = parse(text);
  const styles = compileStyles({
    info: tree.info,
    style: tree.styles.style,
    defaultStyle: options.defaultStyle || {},
  });
  return {
    info: tree.info,
    width: tree.info.PlayResX * 1 || null,
    height: tree.info.PlayResY * 1 || null,
    collisions: tree.info.Collisions || 'Normal',
    styles,
    dialogues: compileDialogues({
      styles,
      dialogues: tree.events.dialogue,
    }),
  };
}
