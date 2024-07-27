import { describe, it, expect } from 'vitest';
import { parseFormat } from '../../src/parser/format.js';
import { stylesFormat, eventsFormat } from '../../src/utils.js';

describe('format parser', () => {
  let text = '';

  it('should parse format', () => {
    text = 'Format: Layer, Start,End ,Style , Name,  MarginL  , MarginR, MarginV, Effect, Text';
    expect(parseFormat(text)).to.deep.equal(eventsFormat);
    text = 'Format:Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding';
    expect(parseFormat(text)).to.deep.equal(stylesFormat);
  });

  it('should correct upper or lower cases', () => {
    text = 'Format: Name, FontName, FontSize, PrImArYcOlOuR, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, Strikeout, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding';
    expect(parseFormat(text)).to.deep.equal(stylesFormat);
    text = 'Format: uNkNoWn, Layer, Start, End, Style, Name, Text';
    expect(parseFormat(text)).to.deep.equal(['uNkNoWn', 'Layer', 'Start', 'End', 'Style', 'Name', 'Text']);
  });
});
