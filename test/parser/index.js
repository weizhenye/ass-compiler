import { expect } from 'chai';
import { parse } from '../../src/parser/index.js';
import { stylesFormat, eventsFormat } from '../../src/utils.js';
import { text } from '../fixtures/index.js';

describe('ASS parser', () => {
  it('should parse ASS', () => {
    expect(parse(text)).to.deep.equal({
      info: {
        Title: 'Default Aegisub file',
        ScriptType: 'v4.00+',
        WrapStyle: '0',
        ScaledBorderAndShadow: 'yes',
        'YCbCr Matrix': 'None',
      },
      styles: {
        format: stylesFormat,
        style: [{
          Name: 'Default',
          Fontname: 'Arial',
          Fontsize: '20',
          PrimaryColour: '&H00FFFFFF',
          SecondaryColour: '&H000000FF',
          OutlineColour: '&H00000000',
          BackColour: '&H00000000',
          Bold: '0',
          Italic: '0',
          Underline: '0',
          StrikeOut: '0',
          ScaleX: '100',
          ScaleY: '100',
          Spacing: '0',
          Angle: '0',
          BorderStyle: '1',
          Outline: '2',
          Shadow: '2',
          Alignment: '2',
          MarginL: '10',
          MarginR: '10',
          MarginV: '10',
          Encoding: '1',
        }],
      },
      events: {
        format: eventsFormat,
        comment: [],
        dialogue: [{
          Layer: 0,
          Start: 0,
          End: 5,
          Style: 'Default',
          Name: '',
          MarginL: 0,
          MarginR: 0,
          MarginV: 0,
          Effect: null,
          Text: {
            raw: 'text',
            combined: 'text',
            parsed: [{ tags: [], text: 'text', drawing: [] }],
          },
        }],
      },
    });
  });
});
