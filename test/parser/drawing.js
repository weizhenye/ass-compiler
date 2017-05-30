import { expect } from 'chai';
import parseDrawing from '../../src/parser/drawing';

describe('drawing', () => {
  it('should parse drawing', () => {
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
});
