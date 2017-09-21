import { expect } from 'chai';
import { compileTag } from '../../src/compiler/tag.js';

describe('tag compiler', () => {
  it('should ignore empty tag', () => {
    expect(compileTag({}, 'b')).to.deep.equal(null);
  });

  it('should compile pos,org', () => {
    expect(compileTag({ pos: [1, 2] }, 'pos')).to.deep.equal({ pos: { x: 1, y: 2 } });
    expect(compileTag({ org: [1, 2] }, 'org')).to.deep.equal({ org: { x: 1, y: 2 } });
    expect(compileTag({ pos: [1, 2, 3] }, 'pos')).to.deep.equal(null);
  });

  it('should compile move', () => {
    expect(compileTag({ move: [1, 2, 3, 4] }, 'move')).to.deep.equal({
      move: { x1: 1, y1: 2, x2: 3, y2: 4, t1: 0, t2: 0 },
    });
    expect(compileTag({ move: [1, 2, 3, 4, 5, 6] }, 'move')).to.deep.equal({
      move: { x1: 1, y1: 2, x2: 3, y2: 4, t1: 5, t2: 6 },
    });
    expect(compileTag({ move: [1, 2, 3, 4, 5] }, 'move')).to.deep.equal(null);
  });

  it('should compile fad,fade', () => {
    expect(compileTag({ fad: [1, 2] }, 'fad')).to.deep.equal({
      fade: { type: 'fad', t1: 1, t2: 2 },
    });
    expect(compileTag({ fade: [1, 2] }, 'fade')).to.deep.equal({
      fade: { type: 'fad', t1: 1, t2: 2 },
    });
    expect(compileTag({ fad: [1, 2, 3, 4, 5, 6, 7] }, 'fad')).to.deep.equal({
      fade: { type: 'fade', a1: 1, a2: 2, a3: 3, t1: 4, t2: 5, t3: 6, t4: 7 },
    });
    expect(compileTag({ fade: [1, 2, 3, 4, 5, 6, 7] }, 'fade')).to.deep.equal({
      fade: { type: 'fade', a1: 1, a2: 2, a3: 3, t1: 4, t2: 5, t3: 6, t4: 7 },
    });
    expect(compileTag({ fad: [1, 2, 3] }, 'fad')).to.deep.equal(null);
  });

  it('should compile clip', () => {
    let clip;
    clip = {
      inverse: false,
      scale: 1,
      drawing: null,
      dots: [1, 2, 3, 4],
    };
    expect(compileTag({ clip }, 'clip')).to.deep.equal({
      clip: {
        inverse: false,
        scale: 1,
        drawing: null,
        dots: { x1: 1, y1: 2, x2: 3, y2: 4 },
      },
    });
    clip = {
      inverse: false,
      scale: 1,
      drawing: [
        ['m', '0', '0'],
        ['l', '1', '0', '1', '1'],
      ],
      dots: null,
    };
    expect(compileTag({ clip }, 'clip')).to.deep.equal({
      clip: {
        inverse: false,
        scale: 1,
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
        dots: null,
      },
    });
    clip = { inverse: false, scale: 1, drawing: null, dots: null };
    expect(compileTag({ clip }, 'clip')).to.deep.equal(null);
  });

  it('should compile bord,xbord,ybord,shad,xshad,yshad', () => {
    expect(compileTag({ bord: 1 }, 'bord')).to.deep.equal({ xbord: 1, ybord: 1 });
    expect(compileTag({ shad: 1 }, 'shad')).to.deep.equal({ xshad: 1, yshad: 1 });
    expect(compileTag({ xbord: -1 }, 'xbord')).to.deep.equal({ xbord: 0 });
  });

  it('should compile c', () => {
    expect(compileTag({ c1: '000000' }, 'c1', { c1: 'FFFFFF' })).to.deep.equal({ c1: '000000' });
    expect(compileTag({ c1: '' }, 'c1', { c1: 'FFFFFF' })).to.deep.equal({ c1: 'FFFFFF' });
  });

  it('should compile alpha', () => {
    expect(compileTag({ alpha: 'FF' }, 'alpha')).to.deep.equal({ a1: 'FF', a2: 'FF', a3: 'FF', a4: 'FF' });
  });

  it('should compile fr', () => {
    expect(compileTag({ fr: 30 }, 'fr')).to.deep.equal({ frz: 30 });
  });

  it('should compile fs', () => {
    expect(compileTag({ fs: '20' }, 'fs', { fs: 20 })).to.deep.equal({ fs: 20 });
    expect(compileTag({ fs: '+2' }, 'fs', { fs: 20 })).to.deep.equal({ fs: 24 });
    expect(compileTag({ fs: '-3' }, 'fs', { fs: 20 })).to.deep.equal({ fs: 14 });
    expect(compileTag({ fs: '-10' }, 'fs', { fs: 20 })).to.deep.equal({ fs: 20 });
  });

  it('should compile t', () => {
    const t = {
      t1: 0,
      t2: 1000,
      accel: 1,
      tags: [
        { b: 1 },
        { fr: 30 },
        {
          clip: {
            inverse: false,
            scale: 1,
            drawing: [
              ['m', '0', '0'],
              ['l', '1', '0', '1', '1'],
            ],
            dots: null,
          },
        },
      ],
    };
    expect(compileTag({ t }, 't')).to.deep.equal({
      t: { t1: 0, t2: 1000, accel: 1, tag: { frz: 30 } },
    });
  });
});
