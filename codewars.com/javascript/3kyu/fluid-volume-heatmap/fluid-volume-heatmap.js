// https://www.codewars.com/kata/5b98dfa088d44a8b000001c1/train/javascript
const volume = board2d => {

  const board = new MonoBoard(board2d);

  // TODO...

  return 0;
};

/**
 * This is a board represented as 1D array instead of 2D to simplify
 * manipulation of coordinates (one number instead of two)
 */
class MonoBoard {

  DIR_UP = 'up';
  DIR_RIGHT = 'right';
  DIR_DOWN = 'down';
  DIR_LEFT = 'left';

  OUT_OF_BOUND_UP = -1;
  OUT_OF_BOUND_RIGHT = -2;
  OUT_OF_BOUND_DOWN = -3;
  OUT_OF_BOUND_LEFT = -4;
  INVALID_DIR = -5;

  board;
  lastIndex;
  width;
  height;

  constructor(board2d = []) {
    this.board = this.from2D(board2d);
    this.lastIndex = this.board.length - 1;
    this.width = board2d.length ? board2d[0].length : 0;
    this.height = board2d.length;
  }

  from2D(board2d) {
    return board2d.reduce((tot, chunk) => tot.push(...chunk), []);
  }

  to(pos, dir) {
    switch (dir) {
      case this.DIR_UP: {
        const newPos = pos - this.width;
        return (newPos < 0)
          ? this.OUT_OF_BOUND_UP
          : newPos;
      }
      case this.DIR_RIGHT: {
        const newPos = pos + 1;
        return (newPos > this.lastIndex || !this.areOnSameRow(pos, newPos))
          ? this.OUT_OF_BOUND_RIGHT
          : newPos;
      }
      case this.DIR_DOWN: {
        const newPos = pos + this.width;
        return (newPos > this.lastIndex)
          ? this.OUT_OF_BOUND_DOWN
          : newPos;
      }
      case this.DIR_LEFT: {
        const newPos = pos - 1;
        return (newPos < 0)
          ? this.OUT_OF_BOUND_LEFT
          : newPos;
      }
      default:
        return INVALID_DIR;
    }
  }

  areOnSameRow(a, b) {
    const w = this.width;
    return Math.abs(Math.floor(a / w)) === Math.abs(Math.floor(b / w));
  }

  areOnSameColumn(a, b) {
    const w = 8;
    return Math.abs(a % width) === Math.abs(b % width);
  }
}
