import { expect } from 'chai';
import { compile } from '../../src/compiler/index.js';
import { text } from '../fixtures/index.js';

describe('ASS compiler', () => {
  it('should compile ASS', () => {
    const { info, width, height, collisions, styles, dialogues } = compile(text);
    expect(info).to.deep.equal({
      Title: 'Default Aegisub file',
      ScriptType: 'v4.00+',
      WrapStyle: '0',
      ScaledBorderAndShadow: 'yes',
      'YCbCr Matrix': 'None',
    });
    expect(width).to.equal(null);
    expect(height).to.equal(null);
    expect(collisions).to.equal('Normal');
    expect(styles).to.have.property('Default');
    expect(dialogues).to.be.lengthOf(1);
  });
});
