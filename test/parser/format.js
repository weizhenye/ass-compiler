import { expect } from 'chai';
import { parseFormat } from '../../src/parser/format';

describe('format parser', () => {
  let text = '';
  let result = [];

  it('should parse format', () => {
    text = 'Format: Layer, Start,End ,Style , Name,  MarginL  , MarginR, MarginV, Effect, Text';
    result = ['Layer', 'Start', 'End', 'Style', 'Name', 'MarginL', 'MarginR', 'MarginV', 'Effect', 'Text'];
    expect(parseFormat(text)).to.deep.equal(result);
    text = 'Format:Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding';
    result = ['Name', 'Fontname', 'Fontsize', 'PrimaryColour', 'SecondaryColour', 'OutlineColour', 'BackColour', 'Bold', 'Italic', 'Underline', 'StrikeOut', 'ScaleX', 'ScaleY', 'Spacing', 'Angle', 'BorderStyle', 'Outline', 'Shadow', 'Alignment', 'MarginL', 'MarginR', 'MarginV', 'Encoding'];
    expect(parseFormat(text)).to.deep.equal(result);
  });
});
