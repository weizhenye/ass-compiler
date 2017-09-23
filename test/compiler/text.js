import { expect } from 'chai';
import { parseText } from '../../src/parser/text.js';
import { compileStyles } from '../../src/compiler/styles.js';
import { compileText } from '../../src/compiler/text.js';

describe('text compiler', () => {
  const style = [
    ['Default', 'Arial', '20', '&H00FFFFFF', '&H000000FF', '&H000000', '&H00000000', '-1', '0', '0', '0', '100', '100', '0', '0', '1', '2', '2', '2', '10', '10', '10', '0'],
    ['alt', 'Arial', '24', '&H00FFFFFF', '&H000000FF', '&H000000', '&H00000000', '-1', '0', '0', '0', '100', '100', '0', '0', '3', '2', '2', '2', '10', '10', '10', '0'],
  ];
  const format = ['Name', 'Fontname', 'Fontsize', 'PrimaryColour', 'SecondaryColour', 'OutlineColour', 'BackColour', 'Bold', 'Italic', 'Underline', 'StrikeOut', 'ScaleX', 'ScaleY', 'Spacing', 'Angle', 'BorderStyle', 'Outline', 'Shadow', 'Alignment', 'MarginL', 'MarginR', 'MarginV', 'Encoding'];
  const styles = compileStyles({ info: { WrapStyle: 0 }, style, format });
  const name = 'Default';

  it('should compile text with drawing', () => {
    const { parsed } = parseText('{\\p1}m 0 0 l 1 0 1 1');
    const { slices } = compileText({ styles, name, parsed });
    expect(slices[0].fragments[0]).to.deep.equal({
      tag: { p: 1 },
      text: '',
      drawing: {
        minX: 0,
        minY: 0,
        width: 1,
        height: 1,
        instructions: [
          { type: 'M', points: [{ x: 0, y: 0 }] },
          { type: 'L', points: [{ x: 1, y: 0 }, { x: 1, y: 1 }] },
        ],
        d: 'M0,0L1,0,1,1',
      },
    });
  });

  it('should compile global tags', () => {
    const { parsed } = parseText('{\\an1\\a7\\pos(1,2)\\org(1,2)\\move(1,2,3,4)\\fade(1,2)\\fad(3,4)\\clip(1,2,3,4)}bla bla');
    const { alignment, pos, org, move, fade, clip } = compileText({ styles, name, parsed });
    expect(alignment).to.equal(1);
    expect(pos).to.deep.equal({ x: 1, y: 2 });
    expect(org).to.deep.equal({ x: 1, y: 2 });
    expect(move).to.deep.equal({ x1: 1, y1: 2, x2: 3, y2: 4, t1: 0, t2: 0 });
    expect(fade).to.deep.equal({ type: 'fad', t1: 1, t2: 2 });
    expect(clip).to.deep.equal({
      inverse: false,
      scale: 1,
      drawing: null,
      dots: { x1: 1, y1: 2, x2: 3, y2: 4 },
    });
  });

  it('should compile text with \\r', () => {
    const { parsed } = parseText('{\\fr30}a{\\r}b{\\fr60}c{\\ralt}d');
    const { slices } = compileText({ styles, name, parsed });
    expect(slices).to.deep.equal([
      {
        name: 'Default',
        borderStyle: 1,
        tag: styles.Default.tag,
        fragments: [{ tag: { frz: 30 }, text: 'a', drawing: null }],
      },
      {
        name: 'Default',
        borderStyle: 1,
        tag: styles.Default.tag,
        fragments: [
          { tag: {}, text: 'b', drawing: null },
          { tag: { frz: 60 }, text: 'c', drawing: null },
        ],
      },
      {
        name: 'alt',
        borderStyle: 3,
        tag: styles.alt.tag,
        fragments: [{ tag: {}, text: 'd', drawing: null }],
      },
    ]);
  });

  it('should compile text with \\t', () => {
    const { parsed } = parseText('{\\t(\\frx30)\\t(0,500,\\fry60)\\t(\\frz90)\\t(0,500,1,\\frz60)}foo');
    const { slices } = compileText({ styles, name, parsed, start: 0, end: 1 });
    expect(slices[0].fragments[0].tag).to.deep.equal({
      t: [
        { t1: 0, t2: 1000, accel: 1, tag: { frx: 30, frz: 90 } },
        { t1: 0, t2: 500, accel: 1, tag: { fry: 60, frz: 60 } },
      ],
    });
  });

  it('should inherit tag from previous fragment', () => {
    const { parsed } = parseText('{\\frx30}a{\\fry60}b{\\frx150\\frz120}c{\\r\\t(\\frx30)}d{\\t(\\fry60)}e');
    const { slices } = compileText({ styles, name, parsed, start: 0, end: 1 });
    expect(slices[0].fragments).to.deep.equal([
      { tag: { frx: 30 }, text: 'a', drawing: null },
      { tag: { frx: 30, fry: 60 }, text: 'b', drawing: null },
      { tag: { frx: 150, fry: 60, frz: 120 }, text: 'c', drawing: null },
    ]);
    expect(slices[1].fragments).to.deep.equal([
      { tag: { t: [{ t1: 0, t2: 1000, accel: 1, tag: { frx: 30 } }] }, text: 'd', drawing: null },
      { tag: { t: [{ t1: 0, t2: 1000, accel: 1, tag: { frx: 30, fry: 60 } }] }, text: 'e', drawing: null },
    ]);
  });
});
