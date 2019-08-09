export interface Tags {
    a: 0 | 1 | 2 | 3 | 5 | 6 | 7 | 9 | 10 | 11;
    a1: string;
    alpha: string;
    an: 0 | 1 | 2 | 3 | 5 | 6 | 7 | 9 | 10 | 11;
    b: 0 | 1;
    be: number;
    blur: number;
    bord: number;
    c: string;
    c1: string;
    c2: string;
    clip: {
        inverse: boolean;
        scale: number;
        drawing?: string[][];
        dots?: [number, number, number, number];
    }
    fad: [number, number];
    fade: [number, number, number, number, number, number];
    fe: number;
    fn: string;
    fax: number;
    fay: number;
    fs: string;
    fscx: number;
    fscy: number;
    fsp: number;
    fr: number;
    frx: number;
    fry: number;
    frz: number;
    i: 0 | 1;
    k: number;
    kf: number;
    ko: number;
    kt: number;
    K: number;
    move: [number, number, number, number] | [number, number, number, number, number, number];
    org: [number, number];
    p: number;
    pbo: number;
    pos: [number, number];
    q: 0 | 1 | 2 | 3;
    r: string;
    s: 0 | 1;
    shad: number;
    t: {
        t1: number;
        t2: number;
        accel: number;
        tags: { [K in keyof Tags]: Tags[K] }[]
    };
    u: 0 | 1;
    xbord: number;
    xshad: number;
    ybord: number;
    yshad: number;
}