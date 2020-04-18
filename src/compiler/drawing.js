import { assign } from '../utils.js';

function createCommand(arr) {
  const cmd = {
    type: null,
    prev: null,
    next: null,
    points: [],
  };
  if (/[mnlbs]/.test(arr[0])) {
    cmd.type = arr[0]
      .toUpperCase()
      .replace('N', 'L')
      .replace('B', 'C');
  }
  for (let len = arr.length - !(arr.length & 1), i = 1; i < len; i += 2) {
    cmd.points.push({ x: arr[i] * 1, y: arr[i + 1] * 1 });
  }
  return cmd;
}

function isValid(cmd) {
  if (!cmd.points.length || !cmd.type) {
    return false;
  }
  if (/C|S/.test(cmd.type) && cmd.points.length < 3) {
    return false;
  }
  return true;
}

function getViewBox(commands) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  [].concat(...commands.map(({ points }) => points)).forEach(({ x, y }) => {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  });
  return {
    minX,
    minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

/**
 * Convert S command to B command
 * Reference from https://github.com/d3/d3/blob/v3.5.17/src/svg/line.js#L259
 * @param  {Array}  points points
 * @param  {String} prev   type of previous command
 * @param  {String} next   type of next command
 * @return {Array}         converted commands
 */
export function s2b(points, prev, next) {
  const results = [];
  const bb1 = [0, 2 / 3, 1 / 3, 0];
  const bb2 = [0, 1 / 3, 2 / 3, 0];
  const bb3 = [0, 1 / 6, 2 / 3, 1 / 6];
  const dot4 = (a, b) => (a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]);
  let px = [points[points.length - 1].x, points[0].x, points[1].x, points[2].x];
  let py = [points[points.length - 1].y, points[0].y, points[1].y, points[2].y];
  results.push({
    type: prev === 'M' ? 'M' : 'L',
    points: [{ x: dot4(bb3, px), y: dot4(bb3, py) }],
  });
  for (let i = 3; i < points.length; i++) {
    px = [points[i - 3].x, points[i - 2].x, points[i - 1].x, points[i].x];
    py = [points[i - 3].y, points[i - 2].y, points[i - 1].y, points[i].y];
    results.push({
      type: 'C',
      points: [
        { x: dot4(bb1, px), y: dot4(bb1, py) },
        { x: dot4(bb2, px), y: dot4(bb2, py) },
        { x: dot4(bb3, px), y: dot4(bb3, py) },
      ],
    });
  }
  if (next === 'L' || next === 'C') {
    const last = points[points.length - 1];
    results.push({ type: 'L', points: [{ x: last.x, y: last.y }] });
  }
  return results;
}

export function toSVGPath(instructions) {
  return instructions.map(({ type, points }) => (
    type + points.map(({ x, y }) => `${x},${y}`).join(',')
  )).join('');
}

export function compileDrawing(rawCommands) {
  const commands = [];
  let i = 0;
  while (i < rawCommands.length) {
    const arr = rawCommands[i];
    const cmd = createCommand(arr);
    if (isValid(cmd)) {
      if (cmd.type === 'S') {
        const { x, y } = (commands[i - 1] || { points: [{ x: 0, y: 0 }] }).points.slice(-1)[0];
        cmd.points.unshift({ x, y });
      }
      if (i) {
        cmd.prev = commands[i - 1].type;
        commands[i - 1].next = cmd.type;
      }
      commands.push(cmd);
      i++;
    } else {
      if (i && commands[i - 1].type === 'S') {
        const additionPoints = {
          p: cmd.points,
          c: commands[i - 1].points.slice(0, 3),
        };
        commands[i - 1].points = commands[i - 1].points.concat(
          (additionPoints[arr[0]] || []).map(({ x, y }) => ({ x, y })),
        );
      }
      rawCommands.splice(i, 1);
    }
  }
  const instructions = [].concat(
    ...commands.map(({ type, points, prev, next }) => (
      type === 'S'
        ? s2b(points, prev, next)
        : { type, points }
    )),
  );

  return assign({ instructions, d: toSVGPath(instructions) }, getViewBox(commands));
}
