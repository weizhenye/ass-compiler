import { expect } from 'chai';
import { parseDrawing } from '../../src/parser/drawing.js';
import { s2b, toSVGPath, compileDrawing } from '../../src/compiler/drawing.js';

describe('drawing compiler', () => {
  it('should convert instructions to SVG Path', () => {
    const instructions = [
      { type: 'M', points: [{ x: 0, y: 0 }] },
      { type: 'L', points: [{ x: 1, y: 0 }, { x: 1, y: 1 }] },
      { type: 'L', points: [{ x: 0, y: 1 }] },
    ];
    expect(toSVGPath(instructions)).to.equal('M0,0L1,0,1,1L0,1');
  });

  it('should convert S command to B command', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 150, y: 60 },
      { x: 150, y: 150 },
      { x: 60, y: 150 },
      { x: 120, y: 120 },
      { x: 90, y: 90 },
    ];
    expect(toSVGPath(s2b(points, 'L', 'S'))).to.equal(
      'L125,65C150,90,150,120,135,135C120,150,90,150,85,145C80,140,100,130,105,120',
    );
    expect(toSVGPath(s2b(points, 'M', 'S'))).to.equal(
      'M125,65C150,90,150,120,135,135C120,150,90,150,85,145C80,140,100,130,105,120',
    );
    expect(toSVGPath(s2b(points, 'M', 'C'))).to.equal(
      'M125,65C150,90,150,120,135,135C120,150,90,150,85,145C80,140,100,130,105,120L90,90',
    );
    expect(toSVGPath(s2b(points, 'M', 'L'))).to.equal(
      'M125,65C150,90,150,120,135,135C120,150,90,150,85,145C80,140,100,130,105,120L90,90',
    );
  });

  it('should deal with C command', () => {
    const rawCommands = parseDrawing('m 0 0 s 150 60 150 150 60 150 c');
    expect(compileDrawing(rawCommands).d).to.equal(
      'M0,0M125,65C150,90,150,120,135,135C120,150,90,150,65,125C40,100,20,50,35,35C50,20,100,40,125,65',
    );
  });

  it('should deal with P command', () => {
    const rawCommands = parseDrawing('m 0 0 s 150 60 150 150 60 150 p 120 120');
    expect(compileDrawing(rawCommands).d).to.equal(
      'M0,0M125,65C150,90,150,120,135,135C120,150,90,150,85,145',
    );
  });

  it('should ignore illegal commands', () => {
    let rawCommands = null;
    rawCommands = [['m', '0', '0'], ['l']];
    expect(compileDrawing(rawCommands).d).to.equal('M0,0');
    rawCommands = [['l'], ['m', '0', '0']];
    expect(compileDrawing(rawCommands).d).to.equal('M0,0');
    rawCommands = [['m', '0', '0'], ['l', '1', '1', '1']];
    expect(compileDrawing(rawCommands).d).to.equal('M0,0L1,1');
    rawCommands = [['m', '0', '0'], ['b', '1', '0', '1', '1']];
    expect(compileDrawing(rawCommands).d).to.equal('M0,0');
    rawCommands = [['m', '0', '0'], ['s', '1', '1']];
    expect(compileDrawing(rawCommands).d).to.equal('M0,0');
    rawCommands = [['s', '1', '1']];
    expect(compileDrawing(rawCommands).d).to.equal('');
    rawCommands = [['s', '150', '60', '150', '150', '60', '150'], ['l', '120']];
    expect(compileDrawing(rawCommands).d).to.equal('L125,65C150,90,150,120,135,135');
  });

  it('should compile drawing commands', () => {
    const rawCommands = parseDrawing('m 0 0 s 150 60 150 150 60 150 120 120 90 90 b 60 90 90 120 60 120');
    const { minX, minY, width, height, d } = compileDrawing(rawCommands);
    expect(minX).to.equal(0);
    expect(minY).to.equal(0);
    expect(width).to.equal(150);
    expect(height).to.equal(150);
    expect(d).to.equal('M0,0M125,65C150,90,150,120,135,135C120,150,90,150,85,145C80,140,100,130,105,120L90,90C60,90,90,120,60,120');
  });
});
