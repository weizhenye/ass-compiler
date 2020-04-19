import { expect } from 'chai';
import { parseDialogue } from '../../src/parser/dialogue.js';
import { compileDialogues } from '../../src/compiler/dialogues.js';
import { compileStyles } from '../../src/compiler/styles.js';
import { eventsFormat } from '../../src/utils.js';

describe('dialogues compiler', () => {
  const style = [
    {
      Name: 'Default',
      Fontname: 'Arial',
      Fontsize: '20',
      PrimaryColour: '&H00FFFFFF',
      SecondaryColour: '&H000000FF',
      OutlineColour: '&H000000',
      BackColour: '&H00000000',
      Bold: '-1',
      Italic: '0',
      Underline: '0',
      StrikeOut: '0',
      ScaleX: '100',
      ScaleY: '100',
      Spacing: '0',
      Angle: '0',
      BorderStyle: '1',
      Outline: '2',
      Shadow: '2',
      Alignment: '2',
      MarginL: '10',
      MarginR: '10',
      MarginV: '10',
      Encoding: '0',
    },
    {
      Name: 'alt',
      Fontname: 'Arial',
      Fontsize: '24',
      PrimaryColour: '&H00FFFFFF',
      SecondaryColour: '&H000000FF',
      OutlineColour: '&H000000',
      BackColour: '&H00000000',
      Bold: '-1',
      Italic: '0',
      Underline: '0',
      StrikeOut: '0',
      ScaleX: '100',
      ScaleY: '100',
      Spacing: '0',
      Angle: '0',
      BorderStyle: '3',
      Outline: '2',
      Shadow: '2',
      Alignment: '2',
      MarginL: '20',
      MarginR: '20',
      MarginV: '20',
      Encoding: '0',
    },
  ];
  const styles = compileStyles({ info: { WrapStyle: 0 }, style });

  it('should compile dialogue', () => {
    const dialogue = parseDialogue('0,0:00:00.00,0:00:05.00,Default,,0,0,0,,text', eventsFormat);
    expect(compileDialogues({ styles, dialogues: [dialogue] })[0]).to.deep.equal({
      layer: 0,
      start: 0,
      end: 5,
      style: 'Default',
      name: '',
      margin: {
        left: 10,
        right: 10,
        vertical: 10,
      },
      effect: null,
      alignment: 2,
      slices: [{
        style: 'Default',
        fragments: [{
          tag: {},
          text: 'text',
          drawing: null,
        }],
      }],
    });
  });

  it('should sort dialogues with start time and end time', () => {
    const dialogues = [
      '2,0:00:05.00,0:00:07.00,Default,,0,0,0,,text2',
      '1,0:00:00.00,0:00:05.00,Default,,0,0,0,,text1',
      '0,0:00:00.00,0:00:03.00,Default,,0,0,0,,text0',
    ].map((dialogue) => parseDialogue(dialogue, eventsFormat));
    const layers = compileDialogues({ styles, dialogues }).map((dia) => dia.layer);
    expect(layers).to.deep.equal([0, 1, 2]);
  });

  it('should ignore dialogues when end > start', () => {
    const dialogues = [
      '0,0:00:00.00,0:00:05.00,Default,,0,0,0,,text1',
      '0,0:07:00.00,0:00:05.00,Default,,0,0,0,,text2',
    ].map((dialogue) => parseDialogue(dialogue, eventsFormat));
    expect(compileDialogues({ styles, dialogues })).to.have.lengthOf(1);
  });

  it('should make layer be a non-negative number', () => {
    const dialogues = [
      '-1,0:00:00.00,0:00:03.00,Default,,0,0,0,,text-1',
      '1,0:00:00.00,0:00:05.00,Default,,0,0,0,,text1',
      '2,0:00:05.00,0:00:07.00,Default,,0,0,0,,text2',
    ].map((dialogue) => parseDialogue(dialogue, eventsFormat));
    const layers = compileDialogues({ styles, dialogues }).map((dia) => dia.layer);
    expect(layers).to.deep.equal([0, 2, 3]);
  });

  it('should use Default Style when style name is not found', () => {
    const dialogue = parseDialogue('0,0:00:00.00,0:00:05.00,Unknown,,0,0,0,,text', eventsFormat);
    const { margin } = compileDialogues({ styles, dialogues: [dialogue] })[0];
    expect(margin.left).to.equal(10);
  });
});
