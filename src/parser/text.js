import parseDrawing from './drawing';
import parseTags from './tags';

function parseText(text) {
  var pairs = text.split(/{([^{}]*?)}/);
  var parsed = [];
  if (pairs[0].length) {
    parsed.push({ tags: [], text: pairs[0], drawing: [] });
  }
  for (var i = 1; i < pairs.length; i += 2) {
    var fragment = { tags: parseTags(pairs[i]) };
    var pTag = fragment.tags
      .filter(function (tag) {
        return tag.p !== undefined;
      })
      .pop();
    var isDrawing = pTag && pTag.p;
    fragment.text = isDrawing ? '' : pairs[i + 1];
    fragment.drawing = isDrawing ? parseDrawing(pairs[i + 1]) : [];
    parsed.push(fragment);
  }
  return {
    raw: text,
    combined: parsed
      .map(function (frag) {
        return frag.text;
      })
      .join(''),
    parsed: parsed,
  };
}

export default parseText;
