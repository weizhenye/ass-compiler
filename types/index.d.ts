import { ParsedTag, CompiledTag } from './tags';

interface ScriptInfo {
    Title: string;
    ScriptType: 'V4.00' | 'V4.00+' | string;
    WrapStyle: '0' | '1' | '2' | '3';
    PlayResX: string;
    PlayResY: string;
    ScaledBorderAndShadow: 'yes' | 'no';
    Collisions: 'Normal' | 'Reverse';
    [name: string]: string;
}

interface ParsedASSStyles {
    format: string[];
    style: {
        Name: string;
        Fontname: string;
        Fontsize: string;
        PrimaryColour: string;
        SecondaryColour: string;
        OutlineColour: string;
        BackColour: string;
        Bold: string;
        Italic: string;
        Underline: string;
        StrikeOut: string;
        ScaleX: string;
        ScaleY: string;
        Spacing: string;
        Angle: string;
        BorderStyle: string;
        Outline: string;
        Shadow: string;
        Alignment: string;
        MarginL: string;
        MarginR: string;
        MarginV: string;
        Encoding: string;
    }[];
}

interface ParsedASSEventTextParsed {
    tags: { [K in keyof ParsedTag]: ParsedTag[K]; }[];
    text: string;
    drawing: string[][];
}

interface EffectBanner {
    name: 'banner';
    delay: number;
    leftToRight: number;
    fadeAwayWidth: number;
}

interface EffectScroll {
    name: 'scroll up' | 'scroll down';
    y1: number;
    y2: number;
    delay: number;
    fadeAwayHeight: number;
}

interface ParsedASSEventText {
    raw: string;
    combined: string;
    parsed: ParsedASSEventTextParsed[];
}

interface ParsedASSEvent {
    Layer: number;
    Start: number;
    End: number;
    Style: string;
    Name: string;
    MarginL: number;
    MarginR: number;
    MarginV: number;
    Effect?: EffectBanner | EffectScroll;
    Text: ParsedASSEventText;
}

interface ParsedASSEvents {
    format: string[];
    comment: ParsedASSEvent[];
    dialogue: ParsedASSEvent[];
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

export function stringify(obj: ParsedASS): string;

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
    b: 0 | 1;
    i: 0 | 1;
    u: 0 | 1;
    s: 0 | 1;
    fscx: number;
    fscy: number;
    fsp: number;
    frz: number;
    xbord: number;
    ybord: number;
    xshad: number;
    yshad: number;
    fe: number;
    q: 0 | 1 | 2 | 3;
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
        Outline: number;
        Shadow: number;
        Alignment: number;
        MarginL: number;
        MarginR: number;
        MarginV: number;
        Encoding: number;
    }
    tag: CompiledASSStyleTag;
}

export interface DialogueDrawingInstruction {
    type: 'M' | 'L' | 'C';
    points: {
        x: number;
        y: number;
    }[];
}

export interface DialogueDrawing {
    instructions: DialogueDrawingInstruction[];
    d: string;
    minX: number;
    minY: number;
    width: number;
    height: number;
}

export interface DialogueFragment {
    tag: CompiledTag;
    text: string;
    drawing?: DialogueDrawing;
}

export interface DialogueSlice {
    style: string;
    fragments: DialogueFragment[];
}

export interface Dialogue {
    layer: number;
    start: number;
    end: number;
    style: string;
    name: string;
    margin: {
        left: number;
        right: number;
        vertical: number;
    }
    effect?: EffectBanner | EffectScroll;
    alignment: number;
    slices: DialogueSlice[];
    pos?: {
        x: number;
        y: number;
    };
    org?: {
        x: number;
        y: number;
    };
    move?: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        t1: number;
        t2: number;
    };
    fade?: {
        type: 'fad';
        t1: number;
        t2: number;
    } | {
        type: 'fade';
        a1: number;
        a2: number;
        a3: number;
        t1: number;
        t2: number;
        t3: number;
        t4: number;
    };
    clip?: {
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
}

export interface CompiledASS {
    info: ScriptInfo;
    width: number;
    height: number;
    collisions: 'Normal' | 'Reverse';
    styles: { [styleName: string]: CompiledASSStyle };
    dialogues: Dialogue[];
}

export function compile(text: string, options: object): CompiledASS;

export function decompile(obj: CompiledASS): string;
