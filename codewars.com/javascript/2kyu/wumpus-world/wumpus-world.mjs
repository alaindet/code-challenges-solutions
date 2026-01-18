export const CaveRoom = Object.freeze({
  Empty: '_',
  Wumpus: 'W',
  Gold: 'G',
  Pit: 'P',
  Visited: 'V',
});
/** @typedef {typeof CaveRoom[keyof typeof CaveRoom]} CaveRoomType */

const Direction = Object.freeze({
  Right: 'right',
  Down: 'down',
  Left: 'left',
  Up: 'up',
});
/** @typedef {typeof Direction[keyof typeof Direction]} DirectionType */

/** @type {Record<Direction, Direction>} */
const NextClockWiseDirection = Object.freeze({
  [Direction.Right]: Direction.Down,
  [Direction.Down]: Direction.Left,
  [Direction.Left]: Direction.Up,
  [Direction.Up]: Direction.Right,
});

/** @typedef {CaveRoomType[][]} Cave */
/** @typedef {boolean[][]} RoomTracking */
/** @typedef {[number, number]} Position */
/** @typedef {Position[]} Path */

export function wumpusWorld2(cave) {
  const startingPosition = [0,0];
  const { row, col } = startingPosition;
  cave[row][col] = CaveRoom.Visited;
  return solveDungeon(cave, startingPosition, Direction.Right);
}

/**
 * This function explores the cave recursively and takes a preferred direction
 * as a hint. Returns if the treasure was found or not
 *
 * @param {Cave} cave 
 * @param {Path} path
 * @param {Direction} dir
 * @returns {boolean}
 */
function solveDungeon(cave, path, dir) {
  let currentDir = dir;
  let currentPath = [...path];
  let currentPos = path[path.length - 1]; 

  let turned = 0;
  while (true) {
    const nextPos = getNextPosition(currentPos, currentDir);
    const [nextRow, nextCol] = nextPos;

    // Check for out of bound position
    if (nextRow < 0 || nextRow >= cave.length || nextCol < 0 || nextCol >= cave.length) {
      currentDir = getNextDirection(currentDir);
      turned++;
    }

    switch (cave[nextRow][nextCol]) {
      case CaveRoom.Empty:
        currentPath.push(nextPos);
        cave[nextRow][nextCol] = CaveRoom.Visited;
        // ...
        break;
      case CaveRoom.Gold:
        currentPath.push(nextPos);
        return true;
      case CaveRoom.Pit:
      case CaveRoom.Visited:
      case CaveRoom.Wumpus:
        currentDir = getNextDirection(currentDir);
        turned++;
        break;
    }
  }
}

function getNextPosition(pos, dir) {
  const [row, col] = pos;

  switch (dir) {
    case Direction.Right:
      return [row, col + 1];
    case Direction.Down:
      return [row + 1, col];
    case Direction.Left:
      return [row, col - 1];
    case Direction.Up:
      return [row - 1, col];
  }
}

function getNextDirection(dir) {
  switch (dir) {
    case Direction.Right:
      return Direction.Down;
    case Direction.Down:
      return Direction.Left;
    case Direction.Left:
      return Direction.Up;
    case Direction.Up:
      return Direction.Right;
  }
}

/**
 * This accepts a squared 4x4 cave with 16 rooms and checks if the player can
 * reach the treasure room with simple rules
 * 
 * - The player always starts at the top left room
 * - Each room can be empty, contain 1 wumpus (the monster), 1 treasure or 1 pit
 * - Each room be empty or contain 1 thing (the wumpus, the treasure or a pit)
 * - There's ALWAYS only 1 wumpus and only 1 treasure in the whole cave
 * - There can be between 1 and 3 pits
 * - The player entering the wumpus room or a pit room loses the game
 * - The player entering the treasure room wins the game
 * - If the player is adjacent to the wumpus room, he/she can smell it
 * - If the player is adjacent to a pit room, he/she can feel the wind
 * 
 * @param {Cave} cave 
 * @returns {boolean}
 */
export function wumpusWorld(cave) {

  const grid = new CaveGrid(cave);
  const player = new Player([0, 0], Direction.Right);
  grid.visit(player.position);

  try {
    while (true) {
      let nextPosition = null;

      while (nextPosition === null) {
        nextPosition = grid.getNextPosition(player);
        if (nextPosition) break;
        player.turn();
      }

      switch (grid.peek(nextPosition)) {
        case CaveRoom.Gold:
          console.log(`Found gold: pos=[${nextPosition[0]}, ${nextPosition[1]}]`);
          return true;
        case CaveRoom.Empty:
          if (grid.isVisited(nextPosition)) {
            console.log(`Peeked a visited empty room: pos=[${nextPosition[0]}, ${nextPosition[1]}]`);
            player.turn();
          } else {
            player.move(nextPosition);
            grid.visit(nextPosition);  
          }
          break;
        case CaveRoom.Wumpus:
          console.log(`Peeked a wumpus: pos=[${nextPosition[0]}, ${nextPosition[1]}]`);
          player.turn();
          break;
        case CaveRoom.Pit:
          console.log(`Peeked a pit: pos=[${nextPosition[0]}, ${nextPosition[1]}]`);
          player.turn();
          break;
      }
    }
  } catch (err) {
    return false;
  }
}

class Player {

  /** @type {Position} */
  #position;

  get position() {
    return this.#position;
  }

  /** @type {Direction} */
  #direction;

  get direction() {
    return this.#direction;
  }

  /** @type {number} */
  #consecutiveTurns = 0;

  /**
   * @param {Position} position 
   * @param {Direction} direction 
   */
  constructor(position, direction) {
    this.#position = position;
    this.#direction = direction;
  }

  /**
   * @param {Position} nextPosition
   */
  move(nextPosition) {
    const [prevRow, prevCol] = this.#position;
    const [nextRow, nextCol] = nextPosition;
    this.#position = nextPosition;
    this.#consecutiveTurns = 0;
    console.log(`Moved: from=[${prevRow}, ${prevCol}], to=[${nextRow}, ${nextCol}]`);
  }

  turn() {
    if (this.#consecutiveTurns === 3) {
      const errMessage = 'ERROR: Turned 4 consecutive times';
      console.log(errMessage);
      throw new Error(errMessage);
    }

    this.#direction = NextClockWiseDirection[this.direction];
    this.#consecutiveTurns++;
    console.log(`Turned clock-wise: dir=${this.#direction}, turned=${this.#consecutiveTurns}`);
  }
}

class CaveGrid {
  /** @type {Cave} */
  #cave;

  /** @type {RoomTracking} */
  #tracking;

  /** @param {Cave} */
  constructor(cave) {
    this.#cave = cave;
    const line = new Array(cave.length).fill(false);
    this.#tracking = line.map(() => line.slice());
  }

  /**
   * @param {Position} position
   * @returns {boolean}
   */
  isVisited(position) {
    const [row, col] = position;
    return this.#tracking[row][col];
  }

  /**
   * @param {Position} position
   * @returns {CaveRoom}
   */
  visit(position) {
    const [row, col] = position;
    this.#tracking[row][col] = true;
  }

  /**
   * @param {Position} position
   * @returns {CaveRoom}
   */
  peek(position) {
    const [row, col] = position;
    return this.#cave[row][col];
  }

  /**
   * @param {Player} player 
   * @returns {Position | null}
   */
  getNextPosition(player) {
    const cap = this.#cave.length - 1;
    let [row, col] = player.position;

    switch (player.direction) {
      case Direction.Right:
        col++;
        break;
      case Direction.Down:
        row++;
        break;
      case Direction.Left:
        col--;
        break;
      case Direction.Up:
        row--;
        break;
    }

    // Out of bound
    if (row < 0 || row > cap || col < 0 || col > cap) {
      return null;
    }

    return [row, col];
  }
}