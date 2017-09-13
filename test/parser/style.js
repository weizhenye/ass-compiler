import { expect } from 'chai';
import { parseStyle } from '../../src/parser/style.js';

describe('style parser', () => {
  let text = '';
  let result = [];

  it('should parse style', () => {
    text = 'Style: Default,Arial,20,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,10,0';
    result = ['Default', 'Arial', '20', '&H00FFFFFF', '&H000000FF', '&H00000000', '&H00000000', '0', '0', '0', '0', '100', '100', '0', '0', '1', '2', '2', '2', '10', '10', '10', '0'];
    expect(parseStyle(text)).to.deep.equal(result);
  });
});
