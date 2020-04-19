import { expect } from 'chai';
import { decompile, decompileDrawing, decompileTag } from '../src/decompiler.js';
import { compiled, decompiled } from './fixtures/decompiler.js';

describe('ASS decompiler', () => {
  it('should decompile ASS', () => {
    expect(decompile(compiled)).to.equal(decompiled);
  });

  it('should decompile drawing', () => {
    expect(decompileDrawing({
      instructions: [
        { type: 'M', points: [{ x: 0, y: 0 }] },
        { type: 'L', points: [{ x: 1, y: 0 }, { x: 1, y: 1 }] },
        { type: 'L', points: [{ x: 0, y: 1 }] },
        { type: 'C', points: [{ x: 0, y: 0 }, { x: 150, y: 60 }, { x: 150, y: 150 }, { x: 60, y: 150 }, { x: 120, y: 120 }, { x: 90, y: 90 }] },
      ],
    })).to.equal('m 0 0 l 1 0 1 1 l 0 1 b 0 0 150 60 150 150 60 150 120 120 90 90');
  });

  describe('tag decompiler', () => {
    it('should decompile tag 1c,2c,3c,4c,1a,2a,3a,4a', () => {
      expect(decompileTag({
        c1: '111111',
        c2: '222222',
        c3: '333333',
        c4: '444444',
        a1: '11',
        a2: '22',
        a3: '33',
        a4: '44',
      })).to.deep.equal('\\1c&H111111&\\2c&H222222&\\3c&H333333&\\4c&H444444&\\1a&H11&\\2a&H22&\\3a&H33&\\4a&H44&');
    });

    it('should decompile tag pos,org,move', () => {
      expect(decompileTag({
        pos: { x: 1, y: 2 },
        org: { x: 3, y: 4 },
        move: { x1: 11, y1: 21, x2: 12, y2: 22, t1: 31, t2: 32 },
      })).to.deep.equal('\\pos(1,2)\\org(3,4)\\move(11,21,12,22,31,32)');
    });

    it('should decompile tag fade', () => {
      expect(decompileTag({
        fade: { type: 'fad', t1: 1000, t2: 2000 },
      })).to.deep.equal('\\fad(1000,2000)');
      expect(decompileTag({
        fade: { type: 'fade', t1: 1, t2: 2, t3: 3, t4: 4, a1: 11, a2: 12, a3: 13 },
      })).to.deep.equal('\\fade(11,12,13,1,2,3,4)');
    });

    it('should decompile clip,iclip', () => {
      expect(decompileTag({
        clip: {
          inverse: false,
          scale: 1,
          drawing: null,
          dots: { x1: 11, y1: 21, x2: 12, y2: 22 },
        },
      })).to.deep.equal('\\clip(11,21,12,22)');
      expect(decompileTag({
        clip: {
          inverse: true,
          scale: 1,
          drawing: null,
          dots: { x1: 11, y1: 21, x2: 12, y2: 22 },
        },
      })).to.deep.equal('\\iclip(11,21,12,22)');
      expect(decompileTag({
        clip: {
          inverse: false,
          scale: 1,
          drawing: {
            instructions: [
              { type: 'M', points: [{ x: 1, y: 2 }] },
              { type: 'L', points: [{ x: 3, y: 4 }] },
            ],
          },
          dots: null,
        },
      })).to.deep.equal('\\clip(m 1 2 l 3 4)');
      expect(decompileTag({
        clip: {
          inverse: true,
          scale: 2,
          drawing: {
            instructions: [
              { type: 'M', points: [{ x: 5, y: 6 }] },
              { type: 'L', points: [{ x: 7, y: 8 }] },
            ],
          },
          dots: null,
        },
      })).to.deep.equal('\\iclip(2,m 5 6 l 7 8)');
    });

    it('should decompile tag t', () => {
      expect(decompileTag({
        t: [
          {
            t1: 1,
            t2: 2,
            accel: 3,
            tag: {
              clip: {
                inverse: false,
                scale: 1,
                drawing: null,
                dots: { x1: 11, y1: 21, x2: 12, y2: 22 },
              },
            },
          },
          {
            t1: 4,
            t2: 5,
            accel: 6,
            tag: {
              b: 1,
              fr: 30,
            },
          },
        ],
      })).to.deep.equal('\\t(1,2,3,\\clip(11,21,12,22))\\t(4,5,6,\\b1\\fr30)');
    });
  });
});
