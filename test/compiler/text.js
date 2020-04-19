import { expect } from 'chai';
import { parseText } from '../../src/parser/text.js';
import { compileStyles } from '../../src/compiler/styles.js';
import { compileText } from '../../src/compiler/text.js';

describe('text compiler', () => {
  const styles = compileStyles({
    info: { WrapStyle: 0 },
    style: [
      {
        Name: 'Default',
        Fontname: 'Arial',
        Fontsize: '20',
        PrimaryColour: '&H00FFFFFF',
        SecondaryColour: '&H000000FF',
        OutlineColour: '&H000000',
        BackColour: '&H00000000',
        Bold: '-1',
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
      },
      {
        Name: 'alt',
        Fontname: 'Arial',
        Fontsize: '24',
        PrimaryColour: '&H00FFFFFF',
        SecondaryColour: '&H000000FF',
        OutlineColour: '&H000000',
        BackColour: '&H00000000',
        Bold: '-1',
        Italic: '0',
        Underline: '0',
        StrikeOut: '0',
        ScaleX: '100',
        ScaleY: '100',
        Spacing: '0',
        Angle: '0',
        BorderStyle: '3',
        Outline: '2',
        Shadow: '2',
        Alignment: '2',
        MarginL: '10',
        MarginR: '10',
        MarginV: '10',
        Encoding: '0',
      },
    ],
  });
  const style = 'Default';

  it('should compile text with drawing', () => {
    const { parsed } = parseText('{\\p1}m 0 0 l 1 0 1 1');
    const { slices } = compileText({ styles, style, parsed });
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
    const { alignment, pos, org, move, fade, clip } = compileText({ styles, style, parsed });
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
    const { slices } = compileText({ styles, style, parsed });
    expect(slices).to.deep.equal([
      {
        style: 'Default',
        fragments: [{ tag: { frz: 30 }, text: 'a', drawing: null }],
      },
      {
        style: 'Default',
        fragments: [
          { tag: {}, text: 'b', drawing: null },
          { tag: { frz: 60 }, text: 'c', drawing: null },
        ],
      },
      {
        style: 'alt',
        fragments: [{ tag: {}, text: 'd', drawing: null }],
      },
    ]);
  });

  it('should compile text with \\t', () => {
    const { parsed } = parseText('{\\t(\\frx30)\\t(0,500,\\fry60)\\t(\\frz90)\\t(0,500,1,\\frz60)}foo');
    const { slices } = compileText({ styles, style, parsed, start: 0, end: 1 });
    expect(slices[0].fragments[0].tag).to.deep.equal({
      t: [
        { t1: 0, t2: 1000, accel: 1, tag: { frx: 30 } },
        { t1: 0, t2: 500, accel: 1, tag: { fry: 60 } },
        { t1: 0, t2: 1000, accel: 1, tag: { frz: 90 } },
        { t1: 0, t2: 500, accel: 1, tag: { frz: 60 } },
      ],
    });
  });

  it('should inherit tag from previous fragment', () => {
    const { parsed } = parseText('{\\frx30}a{\\fry60}b{\\frx150\\frz120}c{\\r\\t(\\frx30)}d{\\t(\\fry60)}e');
    const { slices } = compileText({ styles, style, parsed, start: 0, end: 1 });
    expect(slices[0].fragments).to.deep.equal([
      { tag: { frx: 30 }, text: 'a', drawing: null },
      { tag: { frx: 30, fry: 60 }, text: 'b', drawing: null },
      { tag: { frx: 150, fry: 60, frz: 120 }, text: 'c', drawing: null },
    ]);
    expect(slices[1].fragments[0].tag.t).to.deep.equal([
      { t1: 0, t2: 1000, accel: 1, tag: { frx: 30 } },
    ]);
    expect(slices[1].fragments[1].tag.t).to.deep.equal([
      { t1: 0, t2: 1000, accel: 1, tag: { frx: 30 } },
      { t1: 0, t2: 1000, accel: 1, tag: { fry: 60 } },
    ]);
  });

  it('should not inherit karaoke tags from previous fragment', () => {
    const { parsed } = parseText('{\\k10}And {\\k5}now {\\k20}for {\\kf50}ka{\\kf20}ra{\\K70}o{\\K10}ke{\\k0}!{\\kt100\\k30}!!');
    const { slices } = compileText({ styles, style, parsed, start: 0, end: 1 });
    expect(slices[0].fragments).to.deep.equal([
      { drawing: null, text: 'And ', tag: { k: 10 } },
      { drawing: null, text: 'now ', tag: { k: 5 } },
      { drawing: null, text: 'for ', tag: { k: 20 } },
      { drawing: null, text: 'ka', tag: { kf: 50 } },
      { drawing: null, text: 'ra', tag: { kf: 20 } },
      { drawing: null, text: 'o', tag: { kf: 70 } },
      { drawing: null, text: 'ke', tag: { kf: 10 } },
      { drawing: null, text: '!', tag: { k: 0 } },
      { drawing: null, text: '!!', tag: { kt: 100, k: 30 } },
    ]);
  });

  it('should not create fragment without text and drawing', () => {
    const { parsed } = parseText('{\\b1}{\\p1}m 0 0 l 1 0 1 1{\\p0}');
    const { slices } = compileText({ styles, style, parsed });
    expect(slices[0].fragments[0].tag).to.deep.equal({ p: 1, b: 1 });
    expect(slices[0].fragments.length).to.equal(1);
  });

  it('should merge two fragments if the latter has no tag', () => {
    const { parsed } = parseText('foo{\\a1}bar{\\an2}baz');
    const { slices } = compileText({ styles, style, parsed });
    expect(slices[0].fragments).to.deep.equal([
      { tag: {}, text: 'foobarbaz', drawing: null },
    ]);
  });
});
