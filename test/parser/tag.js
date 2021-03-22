import { expect } from 'chai';
import { parseTag } from '../../src/parser/tag.js';

describe('tag parser', () => {
  it('should parse b,i,u,s', () => {
    ['b', 'i', 'u', 's'].forEach((tag) => {
      expect(parseTag(`${tag}0`)).to.deep.equal({ [tag]: 0 });
      expect(parseTag(`${tag}1`)).to.deep.equal({ [tag]: 1 });
    });
  });

  it('should parse fn', () => {
    expect(parseTag('fnArial')).to.deep.equal({ fn: 'Arial' });
    expect(parseTag('fnNoto Sans')).to.deep.equal({ fn: 'Noto Sans' });
    expect(parseTag('fn黑体')).to.deep.equal({ fn: '黑体' });
    expect(parseTag('fn@微软雅黑')).to.deep.equal({ fn: '@微软雅黑' });
  });

  it('should parse fe', () => {
    expect(parseTag('fe0')).to.deep.equal({ fe: 0 });
    expect(parseTag('fe134')).to.deep.equal({ fe: 134 });
  });

  it('should parse k,K,kf,ko,kt', () => {
    ['k', 'K', 'kf', 'ko', 'kt'].forEach((tag) => {
      expect(parseTag(`${tag}0`)).to.deep.equal({ [tag]: 0 });
      expect(parseTag(`${tag}100`)).to.deep.equal({ [tag]: 100 });
    });
  });

  it('should parse q', () => {
    expect(parseTag('q0')).to.deep.equal({ q: 0 });
    expect(parseTag('q1')).to.deep.equal({ q: 1 });
    expect(parseTag('q2')).to.deep.equal({ q: 2 });
    expect(parseTag('q3')).to.deep.equal({ q: 3 });
  });

  it('should parse p', () => {
    expect(parseTag('p0')).to.deep.equal({ p: 0 });
    expect(parseTag('p1')).to.deep.equal({ p: 1 });
  });

  it('should parse pbo', () => {
    expect(parseTag('pbo0')).to.deep.equal({ pbo: 0 });
    expect(parseTag('pbo10')).to.deep.equal({ pbo: 10 });
  });

  it('should parse an,a', () => {
    for (let i = 1; i <= 11; i++) {
      expect(parseTag(`an${i}`)).to.deep.equal({ an: i });
      expect(parseTag(`a${i}`)).to.deep.equal({ a: i });
    }
  });

  it('should parse r', () => {
    expect(parseTag('r')).to.deep.equal({ r: '' });
    expect(parseTag('rDefault')).to.deep.equal({ r: 'Default' });
  });

  it('should parse be,blur', () => {
    expect(parseTag('be1')).to.deep.equal({ be: 1 });
    expect(parseTag('be2.33')).to.deep.equal({ be: 2.33 });
    expect(parseTag('blur1')).to.deep.equal({ blur: 1 });
    expect(parseTag('blur2.33')).to.deep.equal({ blur: 2.33 });
  });

  it('should parse fs', () => {
    expect(parseTag('fs15')).to.deep.equal({ fs: '15' });
    expect(parseTag('fs+6')).to.deep.equal({ fs: '+6' });
    expect(parseTag('fs-6')).to.deep.equal({ fs: '-6' });
  });

  it('should parse fsp', () => {
    expect(parseTag('fsp0')).to.deep.equal({ fsp: 0 });
    expect(parseTag('fsp5')).to.deep.equal({ fsp: 5 });
  });

  it('should parse fscx,fscy,fax,fay,frx,fry,frz,fr', () => {
    ['fscx', 'fscy', 'fax', 'fay', 'frx', 'fry', 'frz', 'fr'].forEach((tag) => {
      expect(parseTag(`${tag}0`)).to.deep.equal({ [tag]: 0 });
      expect(parseTag(`${tag}2.33`)).to.deep.equal({ [tag]: 2.33 });
      expect(parseTag(`${tag}-30`)).to.deep.equal({ [tag]: -30 });
    });
  });

  it('should parse bord,xbord,ybord,shad,xshad,yshad', () => {
    ['bord', 'xbord', 'ybord', 'shad', 'xshad', 'yshad'].forEach((tag) => {
      expect(parseTag(`${tag}0`)).to.deep.equal({ [tag]: 0 });
      expect(parseTag(`${tag}2.33`)).to.deep.equal({ [tag]: 2.33 });
      expect(parseTag(`${tag}-3`)).to.deep.equal({ [tag]: -3 });
    });
  });

  it('should parse c', () => {
    expect(parseTag('1c&HFFFFFF&')).to.deep.equal({ c1: 'FFFFFF' });
    expect(parseTag('2c&HFFFFFF&')).to.deep.equal({ c2: 'FFFFFF' });
    expect(parseTag('3c&HFFFFFF&')).to.deep.equal({ c3: 'FFFFFF' });
    expect(parseTag('4c&HFFFFFF&')).to.deep.equal({ c4: 'FFFFFF' });
    expect(parseTag('c&HFFFFFF&')).to.deep.equal({ c1: 'FFFFFF' });
    expect(parseTag('1c&HFFF&')).to.deep.equal({ c1: '000FFF' });
    expect(parseTag('1c&HFFFFFF')).to.deep.equal({ c1: 'FFFFFF' });
    expect(parseTag('1c&FFFFFF')).to.deep.equal({ c1: 'FFFFFF' });
    expect(parseTag('1cFFFFFF')).to.deep.equal({ c1: 'FFFFFF' });
    expect(parseTag('1cHFFFFFF')).to.deep.equal({ c1: 'FFFFFF' });
    expect(parseTag('1c')).to.deep.equal({ c1: '' });
  });

  it('should parse alpha', () => {
    expect(parseTag('1a&HFF&')).to.deep.equal({ a1: 'FF' });
    expect(parseTag('2a&HFF&')).to.deep.equal({ a2: 'FF' });
    expect(parseTag('3a&HFF&')).to.deep.equal({ a3: 'FF' });
    expect(parseTag('4a&HFF&')).to.deep.equal({ a4: 'FF' });
    expect(parseTag('a&HFF&')).to.deep.equal({});
    expect(parseTag('1a&HFF')).to.deep.equal({ a1: 'FF' });
    expect(parseTag('1a&FF')).to.deep.equal({ a1: 'FF' });
    expect(parseTag('1aFF')).to.deep.equal({ a1: 'FF' });
    expect(parseTag('1aHFF')).to.deep.equal({ a1: 'FF' });
    expect(parseTag('alphaFF')).to.deep.equal({ alpha: 'FF' });
    expect(parseTag('alpha&HFF&')).to.deep.equal({ alpha: 'FF' });
    expect(parseTag('alpha&HFF')).to.deep.equal({ alpha: 'FF' });
    expect(parseTag('alpha&FF')).to.deep.equal({ alpha: 'FF' });
    expect(parseTag('alphaHFF')).to.deep.equal({ alpha: 'FF' });
    expect(parseTag('alpha&HF')).to.deep.equal({ alpha: '0F' });
    expect(parseTag('alpha&H1234')).to.deep.equal({ alpha: '34' });
    expect(parseTag('alpha&H12X34')).to.deep.equal({ alpha: '12' });
  });

  it('should parse pos,org,move,fad,fade', () => {
    ['pos', 'org', 'move', 'fad', 'fade'].forEach((tag) => {
      expect(parseTag(`${tag}(0,1 ,2, 3)`)).to.deep.equal({
        [tag]: [0, 1, 2, 3],
      });
      expect(parseTag(`${tag}( 233,-42 )`)).to.deep.equal({
        [tag]: [233, -42],
      });
    });
  });

  it('should parse clip,iclip', () => {
    expect(parseTag('clip(0,1,2,3)')).to.deep.equal({
      clip: {
        inverse: false,
        scale: 1,
        drawing: null,
        dots: [0, 1, 2, 3],
      },
    });
    expect(parseTag('iclip(0,1,2,3)')).to.deep.equal({
      clip: {
        inverse: true,
        scale: 1,
        drawing: null,
        dots: [0, 1, 2, 3],
      },
    });
    expect(parseTag('clip(m 0 0 l 1 0 1 1 0 1)')).to.deep.equal({
      clip: {
        inverse: false,
        scale: 1,
        drawing: [
          ['m', '0', '0'],
          ['l', '1', '0', '1', '1', '0', '1'],
        ],
        dots: null,
      },
    });
    expect(parseTag('iclip(2, m 0 0 l 1 0 1 1 0 1)')).to.deep.equal({
      clip: {
        inverse: true,
        scale: 2,
        drawing: [
          ['m', '0', '0'],
          ['l', '1', '0', '1', '1', '0', '1'],
        ],
        dots: null,
      },
    });
  });

  it('should parse t', () => {
    expect(parseTag('t()')).to.deep.equal({});
    expect(parseTag('t(\\fs20)')).to.deep.equal({
      t: { t1: 0, t2: 0, accel: 1, tags: [{ fs: '20' }] },
    });
    expect(parseTag('t(\\frx30\\fry60)')).to.deep.equal({
      t: { t1: 0, t2: 0, accel: 1, tags: [{ frx: 30 }, { fry: 60 }] },
    });
    expect(parseTag('t(2,\\fs20 )')).to.deep.equal({
      t: { t1: 0, t2: 0, accel: 2, tags: [{ fs: '20' }] },
    });
    expect(parseTag('t( 0,1000,\\fs20)')).to.deep.equal({
      t: { t1: 0, t2: 1000, accel: 1, tags: [{ fs: '20' }] },
    });
    expect(parseTag('t(0, 1000 ,2,\\fs20)')).to.deep.equal({
      t: { t1: 0, t2: 1000, accel: 2, tags: [{ fs: '20' }] },
    });
    expect(parseTag('t(\\clip(0,1,2,3)\\fs20)')).to.deep.equal({
      t: {
        t1: 0,
        t2: 0,
        accel: 1,
        tags: [
          {
            clip: {
              inverse: false,
              scale: 1,
              drawing: null,
              dots: [0, 1, 2, 3],
            },
          },
          { fs: '20' },
        ],
      },
    });
  });

  it('should support ignoring closing parentheses', () => {
    ['pos', 'org', 'move', 'fad', 'fade'].forEach((tag) => {
      expect(parseTag(`${tag}(0,1,2,3`)).to.deep.equal({
        [tag]: [0, 1, 2, 3],
      });
    });
    const clip = {
      inverse: false,
      scale: 1,
      drawing: null,
      dots: [0, 1, 2, 3],
    };
    expect(parseTag('clip(0,1,2,3')).to.deep.equal({ clip });
    expect(parseTag('clip(m 0 0 l 1 0 1 1 0 1')).to.deep.equal({
      clip: {
        inverse: false,
        scale: 1,
        drawing: [
          ['m', '0', '0'],
          ['l', '1', '0', '1', '1', '0', '1'],
        ],
        dots: null,
      },
    });
    expect(parseTag('t(2,\\fs20')).to.deep.equal({
      t: { t1: 0, t2: 0, accel: 2, tags: [{ fs: '20' }] },
    });
    expect(parseTag('t(\\clip(0,1,2,3\\fs20').t.tags).to.deep.equal([
      { clip },
      { fs: '20' },
    ]);
    expect(parseTag('t(\\fs20\\clip(0,1,2,3').t.tags).to.deep.equal([
      { fs: '20' },
      { clip },
    ]);
  });

  it('should ignore tags without content', () => {
    ['pos', 'org', 'move', 'fad', 'fade', 'clip', 'iclip', 't'].forEach((tag) => {
      expect(parseTag(`${tag}`)).to.deep.equal({});
      expect(parseTag(`${tag}(`)).to.deep.equal({});
      expect(parseTag(`${tag}()`)).to.deep.equal({});
    });
  });
});
