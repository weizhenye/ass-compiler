import { expect } from 'chai';
import { parseText } from '../../src/parser/text.js';

describe('text parser', () => {
  it('should parse text', () => {
    expect(parseText('text')).to.deep.equal({
      raw: 'text',
      combined: 'text',
      parsed: [{ tags: [], text: 'text', drawing: [] }],
    });
  });

  it('should parse text with tags', () => {
    expect(parseText('{\\b1}a')).to.deep.equal({
      raw: '{\\b1}a',
      combined: 'a',
      parsed: [{ tags: [{ b: 1 }], text: 'a', drawing: [] }],
    });
    expect(parseText('a{\\i1}b')).to.deep.equal({
      raw: 'a{\\i1}b',
      combined: 'ab',
      parsed: [
        { tags: [], text: 'a', drawing: [] },
        { tags: [{ i: 1 }], text: 'b', drawing: [] },
      ],
    });
    expect(parseText('{\\b1}a{\\i1}b')).to.deep.equal({
      raw: '{\\b1}a{\\i1}b',
      combined: 'ab',
      parsed: [
        { tags: [{ b: 1 }], text: 'a', drawing: [] },
        { tags: [{ i: 1 }], text: 'b', drawing: [] },
      ],
    });
    expect(parseText('{\\b1}a{\\i1}{\\s1}b')).to.deep.equal({
      raw: '{\\b1}a{\\i1}{\\s1}b',
      combined: 'ab',
      parsed: [
        { tags: [{ b: 1 }], text: 'a', drawing: [] },
        { tags: [{ i: 1 }], text: '', drawing: [] },
        { tags: [{ s: 1 }], text: 'b', drawing: [] },
      ],
    });
  });

  it('should parse text with drawing', () => {
    expect(parseText('{\\p1}m 0 0 l 1 0 1 1 0 1{\\p0}')).to.deep.equal({
      raw: '{\\p1}m 0 0 l 1 0 1 1 0 1{\\p0}',
      combined: '',
      parsed: [
        {
          tags: [{ p: 1 }],
          text: '',
          drawing: [
            ['m', '0', '0'],
            ['l', '1', '0', '1', '1', '0', '1'],
          ],
        },
        { tags: [{ p: 0 }], text: '', drawing: [] },
      ],
    });
  });

  it('should detect whether it is drawing', () => {
    expect(parseText('{\\p1\\p0}m 0 0 l 1 0').parsed[0].drawing).to.deep.equal([]);
  });
});
