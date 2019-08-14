import { Tags } from "./tags";

// Script Info
interface ScriptInfo {
    Title: '<untitled>' | string;
    ScriptType: 'V4.00' | 'V4.00+' | string;
    WrapStyle: '0' | '1' | '2' | '3';
    PlayResX: string;
    PlayResY: string
    ScaledBorderAndShadow: 'yes' | 'no';

    Collisions: 'Normal' | 'Reverse';
    [name: string]: string;
    // 'Last Style Storage'?: string;
    // 'Video File'?: string;
    // 'Video Aspect Ratio'?: string;
    // 'Video Zoom'?: string;
    // 'Video Position'?: string;

    // 'Original Script'?: '<unknown>' | string;
    // 'Original Translation'?: string;
    // 'Original Editing'?: string;
    // 'Original Timing'?: string;
    // 'Synch Point'?: string;
    // 'Script Updated By'?: string;
    // 'Update Details'?: string;
}

// v4 Styles
interface ParsedASSStyles {
    format: string[];
    style: string[];
}

type ParsedASSEventTextParsedTag = {
    [K in keyof Tags]: Tags[K];
}

interface ParsedASSEventTextParsed {
    tags: ParsedASSEventTextParsedTag[];
    text: string;
    drawing: string[][];
}

interface ParsedASSEventText {
    raw: string;
    combined: string;
    parsed: ParsedASSEventTextParsed[];
}

interface ParsedASSEventObject {
    Layer: number;
    Start: number;
    End: number;
    Style: string;
    Name: string;
    MarginL: number;
    MarginR: number;
    MarginV: number;
    Effect: any;
    Text: ParsedASSEventText;
}

// Events
interface ParsedASSEvents {
    format: string[];
    comment: ParsedASSEventObject[];
    dialogue: ParsedASSEventObject[];
}

export interface ParsedASS {
    info: ScriptInfo;
    styles: ParsedASSStyles;
    events: ParsedASSEvents;
}

/**
 * Parse ASS string.
 * @param text
 */
export function parse(text: string): ParsedASS;



// Compiled Script Info

// interface CompiledAssInfo {
//     Title: '<untitled>' | string;
//     ScriptType: 'V4.00' | 'V4.00+' | string;
//     WrapStyle: '0' | '1' | '2' | '3';
//     PlayResX: string;
//     PlayResY: string
//     ScaledBorderAndShadow: 'yes' | 'no';

//     'Last Style Storage'?: string;
//     'Video File'?: string;
//     'Video Aspect Ratio'?: string;
//     'Video Zoom'?: string;
//     'Video Position'?: string;

//     'Original Script'?: '<unknown>' | string;
//     'Original Translation'?: string;
//     'Original Editing'?: string;
//     'Original Timing'?: string;
//     'Synch Point'?: string;
//     'Script Updated By'?: string;
//     'Update Details'?: string;
// }

export interface CompiledASSStyleTag {
    fn: string;
    fs: number;
    c1: string;
    a1: string;
    c2: string;
    a2: string;
    c3: string;
    a3: string;
    c4: string;
    a4: string;
    b: number;
    i: number;
    u: number;
    s: number;
    fscx: number;
    fscy: number;
    fsp: number;
    frz: number;
    xbord: number;
    ybord: number;
    xshad: number;
    yshad: number;
    q: number;
}

export interface CompiledASSStyle {
    style: {
        Name: string;
        Fontname: string;
        Fontsize: number;
        PrimaryColour: string;
        SecondaryColour: string;
        OutlineColour: string;
        BackColour: string;
        Bold: -1 | 0;
        Italic: -1 | 0;
        Underline: -1 | 0;
        StrikeOut: -1 | 0;
        ScaleX: number;
        ScaleY: number;
        Spacing: number;
        Angle: number;
        BorderStyle: 1 | 3;
        Outline: 0 | 1 | 2 | 3 | 4;
        Shadow: 0 | 1 | 2 | 3 | 4;
        Alignment: number;
        MarginL: number;
        MarginR: number;
        MarginV: number;
        Encoding: 0 | 134 | 136 | number;
    }
    tag: CompiledASSStyleTag;
}

export interface DialogueFragment {
    tag: Tags;
    text: string;
    drawing?: DialogueDrawing;
}

export interface DialogueSlice {
    name: string;
    borderStyle: 1 | 3;
    fragments: DialogueFragment[];
}

export interface DialogueDrawingInstructionPoint {
    x: number;
    y: number;
}

export interface DialogueDrawingInstruction {
    type: 'M' | 'N' | 'L' | 'B' | 'C' | 'S';
    points: DialogueDrawingInstructionPoint[];
}

export interface DialogueDrawing {
    instructions: DialogueDrawingInstruction[];
    d: string;
    minX: number;
    minY: number;
    width: number;
    height: number;
}

export interface DialogueClip {
    inverse: boolean;
    scale: number;
    drawing?: DialogueDrawing;
    dots?: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }
}

export interface Dialogue {
    layer: number;
    start: number;
    end: number;
    margin: {
        left: number;
        right: number;
        vertical: number;
    }
    effect: any;
    alignment: number;
    slices: DialogueSlice[];
    clip?: DialogueClip;
}

export interface CompiledASS {
    info: ScriptInfo;
    width: number;
    height: number;
    collisions: 'Normal' | 'Reverse';
    styles: { [styleName: string]: CompiledASSStyle };
    dialogues: Dialogue[];
}

export function compile(text: string): CompiledASS;
