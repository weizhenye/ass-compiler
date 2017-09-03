import { expect } from 'chai';
import parseEffect from '../../src/parser/effect';

describe('effect parser', () => {
  it('should parse Scroll up/down', () => {
    expect(parseEffect('Scroll up;40;320;5;80')).to.deep.equal({
      name: 'scroll up',
      y1: 40,
      y2: 320,
      delay: 5,
      fadeAwayHeight: 80,
    });
    expect(parseEffect('Scroll down;40;320;5;80')).to.deep.equal({
      name: 'scroll down',
      y1: 40,
      y2: 320,
      delay: 5,
      fadeAwayHeight: 80,
    });
  });

  it('should parse Banner', () => {
    expect(parseEffect('Banner;5;1;80')).to.deep.equal({
      name: 'banner',
      delay: 5,
      leftToRight: 1,
      fadeAwayWidth: 80,
    });
  });

  it('should let y1 < y2', () => {
    expect(parseEffect('Scroll up;320;40')).to.deep.equal({
      name: 'scroll up',
      y1: 40,
      y2: 320,
      delay: 0,
      fadeAwayHeight: 0,
    });
  });

  it('should default parmas to 0', () => {
    expect(parseEffect('Scroll up;40;320')).to.deep.equal({
      name: 'scroll up',
      y1: 40,
      y2: 320,
      delay: 0,
      fadeAwayHeight: 0,
    });
    expect(parseEffect('Scroll up;40;320;5')).to.deep.equal({
      name: 'scroll up',
      y1: 40,
      y2: 320,
      delay: 5,
      fadeAwayHeight: 0,
    });
    expect(parseEffect('Banner')).to.deep.equal({
      name: 'banner',
      delay: 0,
      leftToRight: 0,
      fadeAwayWidth: 0,
    });
    expect(parseEffect('Banner;5')).to.deep.equal({
      name: 'banner',
      delay: 5,
      leftToRight: 0,
      fadeAwayWidth: 0,
    });
    expect(parseEffect('Banner;5;1')).to.deep.equal({
      name: 'banner',
      delay: 5,
      leftToRight: 1,
      fadeAwayWidth: 0,
    });
  });

  it('should ignore wrong syntax', () => {
    expect(parseEffect('unknown')).to.equal(null);
  });
});
