export const compiled = {
  info: {
    Title: 'Default Aegisub file',
    ScriptType: 'v4.00+',
    WrapStyle: '0',
    PlayResX: '640',
    PlayResY: '480',
    ScaledBorderAndShadow: 'yes',
  },
  width: 640,
  height: 480,
  collisions: 'Normal',
  styles: {
    Default: {
      style: {
        Name: 'Default',
        Fontname: 'Arial',
        Fontsize: 20,
        PrimaryColour: '&H00FFFFFF',
        SecondaryColour: '&H000000FF',
        OutlineColour: '&H00000000',
        BackColour: '&H00000000',
        Bold: 0,
        Italic: 0,
        Underline: 0,
        StrikeOut: 0,
        ScaleX: 100,
        ScaleY: 100,
        Spacing: 0,
        Angle: 0,
        BorderStyle: 1,
        Outline: 2,
        Shadow: 2,
        Alignment: 2,
        MarginL: 10,
        MarginR: 10,
        MarginV: 10,
        Encoding: 0,
      },
      tag: {
        fn: 'Arial',
        fs: 20,
        c1: 'FFFFFF',
        a1: '00',
        c2: '0000FF',
        a2: '00',
        c3: '000000',
        a3: '00',
        c4: '000000',
        a4: '00',
        b: 0,
        i: 0,
        u: 0,
        s: 0,
        fscx: 100,
        fscy: 100,
        fsp: 0,
        frz: 0,
        xbord: 2,
        ybord: 2,
        xshad: 2,
        yshad: 2,
        q: 0,
      },
    },
    Alt: {
      style: {
        Name: 'Alt',
        Fontname: 'Times New Roman',
        Fontsize: 40,
        PrimaryColour: '&H00FFFFFF',
        SecondaryColour: '&H000000FF',
        OutlineColour: '&H00000000',
        BackColour: '&H00000000',
        Bold: 0,
        Italic: 0,
        Underline: 0,
        StrikeOut: 0,
        ScaleX: 100,
        ScaleY: 100,
        Spacing: 0,
        Angle: 0,
        BorderStyle: 1,
        Outline: 2,
        Shadow: 2,
        Alignment: 8,
        MarginL: 10,
        MarginR: 10,
        MarginV: 10,
        Encoding: 0,
      },
      tag: {
        fn: 'Times New Roman',
        fs: 40,
        c1: 'FFFFFF',
        a1: '00',
        c2: '0000FF',
        a2: '00',
        c3: '000000',
        a3: '00',
        c4: '000000',
        a4: '00',
        b: 0,
        i: 0,
        u: 0,
        s: 0,
        fscx: 100,
        fscy: 100,
        fsp: 0,
        frz: 0,
        xbord: 2,
        ybord: 2,
        xshad: 2,
        yshad: 2,
        q: 0,
      },
    },
  },
  dialogues: [
    {
      layer: 0,
      start: 0,
      end: 4,
      style: 'Default',
      name: '',
      margin: {
        left: 1,
        right: 2,
        vertical: 3,
      },
      effect: null,
      alignment: 2,
      slices: [
        {
          style: 'Default',
          fragments: [
            {
              tag: {},
              text: 'This is a test of the ASS format and some basic features in it.',
              drawing: null,
            },
          ],
        },
      ],
    },
    {
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
      slices: [
        {
          style: 'Default',
          fragments: [
            {
              tag: {},
              text: 'This is a test of the ASS format and some basic features in it.',
              drawing: null,
            },
          ],
        },
      ],
    },
    {
      layer: 0,
      start: 11,
      end: 13,
      style: 'Default',
      name: '',
      margin: {
        left: 10,
        right: 10,
        vertical: 10,
      },
      effect: null,
      alignment: 9,
      slices: [
        {
          style: 'Default',
          fragments: [
            {
              tag: {},
              text: 'Upper right',
              drawing: null,
            },
          ],
        },
      ],
    },
    {
      layer: 0,
      start: 24,
      end: 26,
      style: 'Default',
      name: '',
      margin: {
        left: 10,
        right: 10,
        vertical: 10,
      },
      effect: null,
      alignment: 2,
      slices: [
        {
          style: 'Default',
          fragments: [
            {
              tag: {},
              text: 'Also ',
              drawing: null,
            },
          ],
        },
        {
          style: 'Alt',
          fragments: [
            {
              tag: {},
              text: 'switching to a different style ',
              drawing: null,
            },
          ],
        },
        {
          style: 'Default',
          fragments: [
            {
              tag: {},
              text: 'inline',
              drawing: null,
            },
          ],
        },
      ],
    },
    {
      layer: 0,
      start: 26,
      end: 28,
      style: 'Default',
      name: '',
      margin: {
        left: 10,
        right: 10,
        vertical: 10,
      },
      effect: null,
      alignment: 5,
      slices: [
        {
          style: 'Default',
          fragments: [
            {
              tag: {},
              text: 'Positioning... this line should be in an odd place',
              drawing: null,
            },
          ],
        },
      ],
      pos: {
        x: 258,
        y: 131,
      },
    },
    {
      layer: 0,
      start: 38,
      end: 40,
      style: 'Default',
      name: '',
      margin: {
        left: 10,
        right: 10,
        vertical: 10,
      },
      effect: null,
      alignment: 2,
      slices: [
        {
          style: 'Default',
          fragments: [
            {
              tag: { p: 1 },
              text: '',
              drawing: {
                instructions: [
                  { type: 'M', points: [{ x: 0, y: 0 }] },
                  { type: 'L', points: [{ x: 1, y: 1 }] },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};

export const decompiled = `[Script Info]
Title: Default Aegisub file
ScriptType: v4.00+
WrapStyle: 0
PlayResX: 640
PlayResY: 480
ScaledBorderAndShadow: yes
Collisions: Normal

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial,20,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,10,0
Style: Alt,Times New Roman,40,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,8,10,10,10,0

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,0:00:04.00,Default,,1,2,3,,This is a test of the ASS format and some basic features in it.
Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0000,0000,0000,,This is a test of the ASS format and some basic features in it.
Dialogue: 0,0:00:11.00,0:00:13.00,Default,,0000,0000,0000,,{\\an9}Upper right
Dialogue: 0,0:00:24.00,0:00:26.00,Default,,0000,0000,0000,,Also {\\rAlt}switching to a different style {\\r}inline
Dialogue: 0,0:00:26.00,0:00:28.00,Default,,0000,0000,0000,,{\\an5\\pos(258,131)}Positioning... this line should be in an odd place
Dialogue: 0,0:00:38.00,0:00:40.00,Default,,0000,0000,0000,,{\\p1}m 0 0 l 1 1
`;
