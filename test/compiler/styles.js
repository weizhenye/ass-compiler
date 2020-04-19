import { expect } from 'chai';
import { parseStyle } from '../../src/parser/style.js';
import { parseStyleColor, compileStyles } from '../../src/compiler/styles.js';
import { stylesFormat } from '../../src/utils.js';

describe('styles compiler', () => {
  const styleString = 'Style:Default,Arial,20,&H00FFFFFF,&H000000FF,&H000000,&H00000000,-1,0,0,0,100,100,0,0,1,2,2,2,10,10,10,0';

  it('should compile styles', () => {
    const result = compileStyles({
      info: { WrapStyle: 0 },
      style: [parseStyle(styleString, stylesFormat)],
    });
    expect(result.Default.style).to.deep.equal({
      Name: 'Default',
      Fontname: 'Arial',
      Fontsize: 20,
      PrimaryColour: '&H00FFFFFF',
      SecondaryColour: '&H000000FF',
      OutlineColour: '&H000000',
      BackColour: '&H00000000',
      Bold: -1,
      Italic: 0,
      Underline: 0,
      StrikeOut: 0,
      ScaleX: 100,
      ScaleY: 100,
      Spacing: 0,
      Angle: 0,
      BorderStyle: 1,
      Outline: 2,
      Shadow: 2,
      Alignment: 2,
      MarginL: 10,
      MarginR: 10,
      MarginV: 10,
      Encoding: 0,
    });
    expect(result.Default.tag).to.deep.equal({
      fn: 'Arial',
      fs: 20,
      c1: 'FFFFFF',
      a1: '00',
      c2: '0000FF',
      a2: '00',
      c3: '000000',
      a3: '00',
      c4: '000000',
      a4: '00',
      b: 1,
      i: 0,
      u: 0,
      s: 0,
      fscx: 100,
      fscy: 100,
      fsp: 0,
      frz: 0,
      xbord: 2,
      ybord: 2,
      xshad: 2,
      yshad: 2,
      fe: 0,
      q: 0,
    });
  });

  it('should set WrapStyle default to 2', () => {
    const result = compileStyles({
      info: {},
      style: [parseStyle(styleString, stylesFormat)],
    });
    expect(result.Default.tag.q).to.equal(2);
  });

  it('should handle `*Default` as `Default`', () => {
    const result = compileStyles({
      info: { WrapStyle: 0 },
      style: [
        parseStyle('Style:*Default,Arial,21,&H00FFFFFF,&H000000FF,&H000000,&H00000000,-1,0,0,0,100,100,0,0,1,2,2,2,10,10,10,0', stylesFormat),
        parseStyle('Style:**Default,Arial,22,&H00FFFFFF,&H000000FF,&H000000,&H00000000,-1,0,0,0,100,100,0,0,1,2,2,2,10,10,10,0', stylesFormat),
      ],
    });
    expect(result['*Default']).to.equal(undefined);
    expect(result['**Default']).to.equal(undefined);
    expect(result.Default.tag.fs).to.equal(22);
  });

  it('should parse color in (AA)BBGGRR format', () => {
    expect(parseStyleColor('&H12345678')).to.deep.equal(['12', '345678']);
    expect(parseStyleColor('&12345678')).to.deep.equal(['12', '345678']);
    expect(parseStyleColor('H12345678')).to.deep.equal(['12', '345678']);
    expect(parseStyleColor('&H123456')).to.deep.equal(['00', '123456']);
    expect(parseStyleColor('&H12345678xx')).to.deep.equal(['12', '345678']);
    expect(parseStyleColor('&H123456xx')).to.deep.equal(['00', '123456']);
  });

  it('should support color present in long integer', () => {
    expect(parseStyleColor('65535')).to.deep.equal(['00', '00ffff']);
    expect(parseStyleColor('-2147483640')).to.deep.equal(['80', '000008']);
    expect(parseStyleColor('15724527')).to.deep.equal(['00', 'efefef']);
    expect(parseStyleColor('986895')).to.deep.equal(['00', '0f0f0f']);
    expect(parseStyleColor('2147483646')).to.deep.equal(['7f', 'fffffe']);
    expect(parseStyleColor('2147483647')).to.deep.equal(['7f', 'ffffff']);
    expect(parseStyleColor('2147483648')).to.deep.equal(['21', '474836']);
    expect(parseStyleColor('2147483649')).to.deep.equal(['21', '474836']);
    expect(parseStyleColor('-2147483647')).to.deep.equal(['80', '000001']);
    expect(parseStyleColor('-2147483648')).to.deep.equal(['80', '000000']);
    expect(parseStyleColor('-2147483649')).to.deep.equal(['00', '000000']);
    expect(parseStyleColor('-2147483650')).to.deep.equal(['00', '000000']);
    expect(parseStyleColor('999999999')).to.deep.equal(['3b', '9ac9ff']);
    expect(parseStyleColor('9999999999')).to.deep.equal(['99', '999999']);
    expect(parseStyleColor('255xx')).to.deep.equal(['00', '0000ff']);
    expect(parseStyleColor('2147483648xx')).to.deep.equal(['21', '474836']);
    expect(parseStyleColor('-2147483649xx')).to.deep.equal(['00', '000000']);
    expect(parseStyleColor('999999999xx')).to.deep.equal(['3b', '9ac9ff']);
    expect(parseStyleColor('999999999xx9')).to.deep.equal(['3b', '9ac9ff']);
  });

  it('should ignore invalid color format', () => {
    const defaultVal = ['00', '000000'];
    expect(parseStyleColor('&Hxx12345678')).to.deep.equal(defaultVal);
    expect(parseStyleColor('&H12xx345678')).to.deep.equal(defaultVal);
    expect(parseStyleColor('&H12345')).to.deep.equal(defaultVal);
    expect(parseStyleColor('xx255')).to.deep.equal(defaultVal);
    expect(parseStyleColor('xx-255')).to.deep.equal(defaultVal);
  });
});
