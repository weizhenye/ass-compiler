import { expect } from 'chai';
import parseTags from '../../src/parser/tags';

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
});
