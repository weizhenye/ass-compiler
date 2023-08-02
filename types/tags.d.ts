export interface ParsedTag {
    a?: 0 | 1 | 2 | 3 | 5 | 6 | 7 | 9 | 10 | 11;
    a1?: string;
    a2?: string;
    a3?: string;
    a4?: string;
    alpha?: string;
    an?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    b?: 0 | 1;
    be?: number;
    blur?: number;
    bord?: number;
    c1?: string;
    c2?: string;
    c3?: string;
    c4?: string;
    clip?: {
        inverse: boolean;
        scale: number;
        drawing?: string[][];
        dots?: [number, number, number, number];
    }
    fad?: [number, number];
    fade?: [number, number, number, number, number, number];
    fax?: number;
    fay?: number;
    fe?: number;
    fn?: string;
    fr?: number;
    frx?: number;
    fry?: number;
    frz?: number;
    fs?: string;
    fscx?: number;
    fscy?: number;
    fsp?: number;
    i?: 0 | 1;
    k?: number;
    kf?: number;
    ko?: number;
    kt?: number;
    K?: number;
    move?: [number, number, number, number] | [number, number, number, number, number, number];
    org?: [number, number];
    p?: number;
    pbo?: number;
    pos?: [number, number];
    q?: 0 | 1 | 2 | 3;
    r?: string;
    s?: 0 | 1;
    shad?: number;
    t?: {
        t1: number;
        t2: number;
        accel: number;
        tags: { [K in keyof ParsedTag]: ParsedTag[K]; }[];
    }
    u?: 0 | 1;
    xbord?: number;
    xshad?: number;
    ybord?: number;
    yshad?: number;
}

export interface CompiledTag {
    a1?: string;
    a2?: string;
    a3?: string;
    a4?: string;
    an?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    b?: 0 | 1;
    be?: number;
    blur?: number;
    c1?: string;
    c2?: string;
    c3?: string;
    c4?: string;
    fax?: number;
    fay?: number;
    fe?: number;
    fn?: string;
    frx?: number;
    fry?: number;
    frz?: number;
    fs?: number;
    fscx?: number;
    fscy?: number;
    fsp?: number;
    i?: 0 | 1;
    k?: number;
    kf?: number;
    ko?: number;
    kt?: number;
    p?: number;
    pbo?: number;
    q?: 0 | 1 | 2 | 3;
    s?: 0 | 1;
    t?: {
        t1: number;
        t2: number;
        accel: number;
        tag: CompiledTag;
    }[];
    u?: 0 | 1;
    xbord?: number;
    xshad?: number;
    ybord?: number;
    yshad?: number;
}
