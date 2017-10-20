import { expect } from 'chai';
import { parseDialogue } from '../../src/parser/dialogue.js';
import { compileDialogues } from '../../src/compiler/dialogues.js';
import { compileStyles } from '../../src/compiler/styles.js';

describe('dialogues compiler', () => {
  const dialogueFormat = ['Layer', 'Start', 'End', 'Style', 'Name', 'MarginL', 'MarginR', 'MarginV', 'Effect', 'Text'];
  const format = ['Name', 'Fontname', 'Fontsize', 'PrimaryColour', 'SecondaryColour', 'OutlineColour', 'BackColour', 'Bold', 'Italic', 'Underline', 'StrikeOut', 'ScaleX', 'ScaleY', 'Spacing', 'Angle', 'BorderStyle', 'Outline', 'Shadow', 'Alignment', 'MarginL', 'MarginR', 'MarginV', 'Encoding'];
  const info = { WrapStyle: 0 };
  const style = [
    ['Default', 'Arial', '20', '&H00FFFFFF', '&H000000FF', '&H000000', '&H00000000', '-1', '0', '0', '0', '100', '100', '0', '0', '1', '2', '2', '2', '10', '10', '10', '0'],
    ['alt', 'Arial', '24', '&H00FFFFFF', '&H000000FF', '&H000000', '&H00000000', '-1', '0', '0', '0', '100', '100', '0', '0', '3', '2', '2', '2', '20', '20', '20', '0'],
  ];
  const styles = compileStyles({ info, style, format });

  it('should compile dialogue', () => {
    const dialogue = parseDialogue('0,0:00:00.00,0:00:05.00,Default,,0,0,0,,text', dialogueFormat);
    expect(compileDialogues({ info, styles, dialogues: [dialogue] })[0]).to.deep.equal({
      layer: 0,
      start: 0,
      end: 5,
      margin: {
        left: 10,
        right: 10,
        vertical: 10,
      },
      effect: null,
      alignment: 2,
      slices: [{
        name: 'Default',
        borderStyle: 1,
        tag: styles.Default.tag,
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
    ].map(dialogue => parseDialogue(dialogue, dialogueFormat));
    const layers = compileDialogues({ info, styles, dialogues }).map(dia => dia.layer);
    expect(layers).to.deep.equal([0, 1, 2]);
  });

  it('should ignore dialogues when end > start', () => {
    const dialogues = [
      '0,0:00:00.00,0:00:05.00,Default,,0,0,0,,text1',
      '0,0:07:00.00,0:00:05.00,Default,,0,0,0,,text2',
    ].map(dialogue => parseDialogue(dialogue, dialogueFormat));
    expect(compileDialogues({ info, styles, dialogues })).to.have.lengthOf(1);
  });

  it('should apply timer to start time and end time', () => {
    const dialogue = parseDialogue('0,0:00:00.00,0:00:05.00,Default,,0,0,0,,text', dialogueFormat);
    const { start, end } = compileDialogues({
      info: { Timer: 50 },
      styles,
      dialogues: [dialogue],
    })[0];
    expect(start).to.equal(0);
    expect(end).to.equal(10);
  });

  it('should make layer be a non-negative number', () => {
    const dialogues = [
      '-1,0:00:00.00,0:00:03.00,Default,,0,0,0,,text-1',
      '1,0:00:00.00,0:00:05.00,Default,,0,0,0,,text1',
      '2,0:00:05.00,0:00:07.00,Default,,0,0,0,,text2',
    ].map(dialogue => parseDialogue(dialogue, dialogueFormat));
    const layers = compileDialogues({ info, styles, dialogues }).map(dia => dia.layer);
    expect(layers).to.deep.equal([0, 2, 3]);
  });
});
