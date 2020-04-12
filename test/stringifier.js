import { expect } from 'chai';
import { stringifyTime, stringifyEffect, stringifyEvent, stringify } from '../src/stringifier.js';

const format = ['Layer', 'Start', 'End', 'Style', 'Name', 'MarginL', 'MarginR', 'MarginV', 'Effect', 'Text'];
const text = `[Script Info]
Title: Default Aegisub file
ScriptType: v4.00+
WrapStyle: 0
ScaledBorderAndShadow: yes
YCbCr Matrix: None

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial,20,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,10,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Comment: 0,0:00:00.00,0:00:04.00,Default,,0000,0000,0000,Banner;5;1;80,text
Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0000,8,0000,,text
`;

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
    }, format)).to.equal('0,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,,text');
  });

  it('should stringify ASS', () => {
    expect(stringify({
      info: {
        Title: 'Default Aegisub file',
        ScriptType: 'v4.00+',
        WrapStyle: '0',
        ScaledBorderAndShadow: 'yes',
        'YCbCr Matrix': 'None',
      },
      styles: {
        format: ['Name', 'Fontname', 'Fontsize', 'PrimaryColour', 'SecondaryColour', 'OutlineColour', 'BackColour', 'Bold', 'Italic', 'Underline', 'StrikeOut', 'ScaleX', 'ScaleY', 'Spacing', 'Angle', 'BorderStyle', 'Outline', 'Shadow', 'Alignment', 'MarginL', 'MarginR', 'MarginV', 'Encoding'],
        style: [{
          Name: 'Default',
          Fontname: 'Arial',
          Fontsize: '20',
          PrimaryColour: '&H00FFFFFF',
          SecondaryColour: '&H000000FF',
          OutlineColour: '&H00000000',
          BackColour: '&H00000000',
          Bold: '0',
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
          Encoding: '1',
        }],
      },
      events: {
        format: ['Layer', 'Start', 'End', 'Style', 'Name', 'MarginL', 'MarginR', 'MarginV', 'Effect', 'Text'],
        comment: [{
          Layer: 0,
          Start: 0,
          End: 4,
          Style: 'Default',
          Name: '',
          MarginL: 0,
          MarginR: 0,
          MarginV: 0,
          Effect: {
            name: 'banner',
            delay: 5,
            leftToRight: 1,
            fadeAwayWidth: 80,
          },
          Text: {
            raw: 'text',
            combined: 'text',
            parsed: [{ tags: [], text: 'text', drawing: [] }],
          },
        }],
        dialogue: [{
          Layer: 0,
          Start: 0,
          End: 5,
          Style: 'Default',
          Name: '',
          MarginL: 0,
          MarginR: 8,
          MarginV: 0,
          Effect: null,
          Text: {
            raw: 'text',
            combined: 'text',
            parsed: [{ tags: [], text: 'text', drawing: [] }],
          },
        }],
      },
    })).to.equal(text);
  });
});
