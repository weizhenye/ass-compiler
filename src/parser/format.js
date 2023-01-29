import { stylesFormat, eventsFormat } from '../utils.js';

export function parseFormat(text) {
  const fields = stylesFormat.concat(eventsFormat);
  return text.match(/Format\s*:\s*(.*)/i)[1]
    .split(/\s*,\s*/)
    .map((field) => {
      const caseField = fields.find((f) => f.toLowerCase() === field.toLowerCase());
      return caseField || field;
    });
}
