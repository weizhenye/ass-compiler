import { expect } from 'chai';
import { stringifyTime, stringifyEffect, stringifyEvent, stringifyTag, stringify } from '../src/stringifier.js';
import { eventsFormat } from '../src/utils.js';
import { parsed, stringified } from './fixtures/stringifier.js';

describe('ASS stringifier', () => {
  it('should stringify time', () => {
    expect(stringifyTime(0)).to.equal('0:00:00.00');
    expect(stringifyTime(5025.67)).to.equal('1:23:45.67');
  });

  it('should stringify effect', () => {
    expect(stringifyEffect({
      name: 'scroll up',
      y1: 40,
      y2: 320,
      delay: 5,
      fadeAwayHeight: 80,
    })).to.equal('Scroll up;40;320;5;80');
    expect(stringifyEffect({
      name: 'scroll down',
      y1: 40,
      y2: 320,
      delay: 5,
      fadeAwayHeight: 80,
    })).to.equal('Scroll down;40;320;5;80');
    expect(stringifyEffect({
      name: 'banner',
      delay: 5,
      leftToRight: 1,
      fadeAwayWidth: 80,
    })).to.equal('Banner;5;1;80');
  });

  it('should stringify event', () => {
    expect(stringifyEvent({
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
    }, eventsFormat)).to.equal('0,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,,text');
  });

  it('should stringify ASS', () => {
    expect(stringify(parsed)).to.equal(stringified);
  });

  describe('tag stringifier', () => {
    it('should stringify tag pos,org,move,fad,fade', () => {
      expect(stringifyTag({ pos: [1, 2] })).to.deep.equal('\\pos(1,2)');
      expect(stringifyTag({ org: [3, 4] })).to.deep.equal('\\org(3,4)');
      expect(stringifyTag({ move: [1, 2, 3, 4] })).to.deep.equal('\\move(1,2,3,4)');
      expect(stringifyTag({ fad: [1, 2] })).to.deep.equal('\\fad(1,2)');
      expect(stringifyTag({ fade: [1, 2, 3, 4, 5, 6, 7] })).to.deep.equal('\\fade(1,2,3,4,5,6,7)');
    });

    it('should stringify tag 1c,2c,3c,4c,1a,2a,3a,4a,alpha', () => {
      expect(stringifyTag({ c1: '111111' })).to.deep.equal('\\1c&H111111&');
      expect(stringifyTag({ c2: '222222' })).to.deep.equal('\\2c&H222222&');
      expect(stringifyTag({ c3: '333333' })).to.deep.equal('\\3c&H333333&');
      expect(stringifyTag({ c4: '444444' })).to.deep.equal('\\4c&H444444&');
      expect(stringifyTag({ a1: '11' })).to.deep.equal('\\1a&H11&');
      expect(stringifyTag({ a2: '22' })).to.deep.equal('\\2a&H22&');
      expect(stringifyTag({ a3: '33' })).to.deep.equal('\\3a&H33&');
      expect(stringifyTag({ a4: '44' })).to.deep.equal('\\4a&H44&');
      expect(stringifyTag({ alpha: '55' })).to.deep.equal('\\alpha&H55&');
    });

    it('should stringify clip,iclip', () => {
      expect(stringifyTag({
        clip: {
          inverse: false,
          scale: 1,
          drawing: null,
          dots: [1, 2, 3, 4],
        },
      })).to.deep.equal('\\clip(1,2,3,4)');
      expect(stringifyTag({
        clip: {
          inverse: true,
          scale: 1,
          drawing: null,
          dots: [1, 2, 3, 4],
        },
      })).to.deep.equal('\\iclip(1,2,3,4)');
      expect(stringifyTag({
        clip: {
          inverse: false,
          scale: 1,
          drawing: [['m', '0', '0'], ['l', '1', '1']],
          dots: null,
        },
      })).to.deep.equal('\\clip(m 0 0 l 1 1)');
      expect(stringifyTag({
        clip: {
          inverse: true,
          scale: 2,
          drawing: [['m', '0', '0'], ['l', '1', '1']],
          dots: null,
        },
      })).to.deep.equal('\\iclip(2,m 0 0 l 1 1)');
    });

    it('should stringify t', () => {
      expect(stringifyTag({
        t: {
          t1: 1,
          t2: 2,
          accel: 3,
          tags: [
            { fs: 20 },
            {
              clip: {
                inverse: false,
                scale: 1,
                drawing: null,
                dots: [1, 2, 3, 4],
              },
            },
          ],
        },
      })).to.deep.equal('\\t(1,2,3,\\fs20\\clip(1,2,3,4))');
    });

    it('should ignore invalid tag', () => {
      expect(stringifyTag({})).to.deep.equal('');
    });
  });
});
