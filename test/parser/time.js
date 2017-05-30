import { expect } from 'chai';
import parseTime from '../../src/parser/time';

describe('time', () => {
  it('should parse time', () => {
    expect(parseTime('0:00:00.00')).to.equal(0);
    expect(parseTime('1:23:45.67')).to.equal(5025.67);
  });
});
