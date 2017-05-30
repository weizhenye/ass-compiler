import parseTag from './tag';

function parseTags(text) {
  return text
    .replace(/\((?:[^()]+|\([^()]*\))*\)/g, function (x) {
      return x.replace(/\\/g, '\n');
    })
    .split(/\\/)
    .slice(1)
    .map(function (x) {
      return x.replace(/\n/g, '\\');
    })
    .map(parseTag);
}

export default parseTags;
