import { stylesFormat, eventsFormat } from '../../src/utils.js';

export const parsed = {
  info: {
    Title: 'Default Aegisub file',
    ScriptType: 'v4.00+',
    WrapStyle: '0',
    ScaledBorderAndShadow: 'yes',
    'YCbCr Matrix': 'None',
  },
  styles: {
    format: stylesFormat,
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
    format: eventsFormat,
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
    dialogue: [
      {
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
      },
      {
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
          raw: '{\\p1}m 0 0 l 1 1',
          combined: '',
          parsed: [{
            tags: [{ p: 1 }],
            text: '',
            drawing: [['m', '0', '0'], ['l', '1', '1']],
          }],
        },
      },
    ],
  },
};

export const stringified = `[Script Info]
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
Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0000,8,0000,,{\\p1}m 0 0 l 1 1
`;
