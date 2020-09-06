import { expect } from 'chai';
import { parseDrawing } from '../../src/parser/drawing.js';

describe('drawing parser', () => {
  it('should parse drawing', () => {
    expect(parseDrawing('')).to.deep.equal([]);
    expect(parseDrawing('m0 0l 1 0 n 2 2')).to.deep.equal([
      ['m', '0', '0'],
      ['l', '1', '0'],
      ['n', '2', '2'],
    ]);
    expect(parseDrawing('m 0 0 s 1 0 1 1 0 1 c')).to.deep.equal([
      ['m', '0', '0'],
      ['s', '1', '0', '1', '1', '0', '1'],
      ['c'],
    ]);
    expect(parseDrawing('m 0 0 b 1 0 1 1 0 1 p 2 2')).to.deep.equal([
      ['m', '0', '0'],
      ['b', '1', '0', '1', '1', '0', '1'],
      ['p', '2', '2'],
    ]);
  });

  it('should ignore unknown character', () => {
    expect(parseDrawing('m0 _ 0\\Nl 1_ _0 e 2\\h2')).to.deep.equal([
      ['m', '0', '0'],
      ['n'],
      ['l', '1', '0', '2', '2'],
    ]);
  });

  it('should support numbers in scientific notation', () => {
    expect(parseDrawing('l _+1.0e+0_ _-.0_ _.2e1_ _20e-1_ _1.2e3.4_')).to.deep.equal([
      ['l', '+1.0e+0', '-.0', '.2e1', '20e-1', '1.2e3', '.4'],
    ]);
  });
});
