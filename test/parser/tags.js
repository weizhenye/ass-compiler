import { expect } from 'chai';
import { parseTags } from '../../src/parser/tags.js';

describe('tags parser', () => {
  it('should parse tags', () => {
    expect(parseTags('\\frx30\\fry60\\frz90')).to.deep.equal([
      { frx: 30 },
      { fry: 60 },
      { frz: 90 },
    ]);
    expect(parseTags('\\frx30\\t(\\frx120)')).to.deep.equal([
      { frx: 30 },
      { t: { t1: 0, t2: 0, accel: 1, tags: [{ frx: 120 }] } },
    ]);
    expect(parseTags('\\clip(0,0,10,10)\\t(\\clip(5,5,15,15))')).to.deep.equal([
      {
        clip: {
          inverse: false, scale: 1, drawing: null, dots: [0, 0, 10, 10],
        },
      },
      {
        t: {
          t1: 0,
          t2: 0,
          accel: 1,
          tags: [{
            clip: {
              inverse: false, scale: 1, drawing: null, dots: [5, 5, 15, 15],
            },
          }],
        },
      },
    ]);
  });

  it('should avoid ReDoS', () => {
    expect(parseTags('\\foo(11111111111111111111111111111(2(3)2)1)x)')).to.deep.equal([{}]);
  });

  it('should ignore tags not starts with `\\`', () => {
    expect(parseTags('Cell phone display')).to.deep.equal([]);
    expect(parseTags('ignored\\an5')).to.deep.equal([{ an: 5 }]);
    expect(parseTags('\\an5\\')).to.deep.equal([{ an: 5 }]);
  });
});
