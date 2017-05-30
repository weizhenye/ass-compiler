import parseEffect from './effect';
import parseText from './text';
import parseTime from './time';

function parseDialogue(text, format) {
  var fields = text.split(',');
  if (fields.length > format.length) {
    var textField = fields.slice(format.length - 1).join();
    fields = fields.slice(0, format.length - 1);
    fields.push(textField);
  }

  var dia = {};
  for (var i = 0; i < fields.length; i++) {
    var fmt = format[i];
    var fld = fields[i].trim();
    switch (fmt) {
      case 'Layer':
      case 'MarginL':
      case 'MarginR':
      case 'MarginV':
        dia[fmt] = fld * 1;
        break;
      case 'Start':
      case 'End':
        dia[fmt] = parseTime(fld);
        break;
      case 'Effect':
        dia[fmt] = parseEffect(fld);
        break;
      case 'Text':
        dia[fmt] = parseText(fld);
        break;
      default:
        dia[fmt] = fld;
    }
  }

  return dia;
}

export default parseDialogue;
