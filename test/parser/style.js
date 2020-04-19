import { expect } from 'chai';
import { parseStyle } from '../../src/parser/style.js';
import { stylesFormat } from '../../src/utils.js';

describe('style parser', () => {
  let text = '';
  let result = [];

  it('should parse style', () => {
    text = 'Style: Default,Arial,20,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,10,0';
    result = {
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
      Encoding: '0',
    };
    expect(parseStyle(text, stylesFormat)).to.deep.equal(result);
  });
});
