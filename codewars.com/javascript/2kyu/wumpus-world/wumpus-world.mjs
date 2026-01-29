export const CaveRoom = Object.freeze({
  Empty: '_',
  Wumpus: 'W',
  Gold: 'G',
  Pit: 'P',
  Visited: 'V',
});

const Direction = Object.freeze({
  Right: 'right',
  Down: 'down',
  Left: 'left',
  Up: 'up',
});

/** @typedef {typeof CaveRoom[keyof typeof CaveRoom]} CaveRoomType */
/** @typedef {typeof Direction[keyof typeof Direction]} DirectionType */
/** @typedef {CaveRoomType[][]} Cave */
/** @typedef {boolean[][]} RoomTracking */
/** @typedef {[number, number]} Position */
/** @typedef {Position[]} Path */
/**
 * @typedef {object} NeighborCaveRoom
 * @property {CaveRoomType} type
 * @property {Position} position
 */

export function wumpusWorld(cave) {
  console.log('Wumpus World', cave); // TODO: Remove
  const pos = [0, 0];
  const path = [pos];
  visitRoom(cave, pos);
  try {
    return solveDungeon(cave, path);
  } catch (solved) {
    return true;
  }
}

/**
 * This function explores the cave recursively and takes a preferred direction
 * as a hint. Returns if the treasure was found or not
 *
 * @param {Cave} cave 
 * @param {Path} path
 * @returns {boolean}
 */
function solveDungeon(cave, path) {
  console.log('solving dungeon', path); // TODO: Remove

  const position = path[path.length - 1];
  const rooms = getValidNeighborRooms(cave, position, { killWumpus: false });

  console.log(`Valid neighbors of [${position[0]}, ${position[1]}]`, rooms); // TODO: Remove

  // No valid neighbor room, it's a dead end
  // Trace back to the last crossroads
  if (rooms.length === 0) {
    console.log('END: no valid neighbor room, dead end', path); // TODO: Remove
    return false;
  }

  // We found the treasure, dungeon solved
  if (rooms.find(room => room.type === CaveRoom.Gold)) {
    console.log('END: Found gold!', path); // TODO: Remove
    throw true;
  }

  // Zugzwang, only one move is possible
  if (rooms.length === 1) {
    visitRoom(cave, rooms[0].position)
    return solveDungeon(cave, [...path, rooms[0].position]);
  }

  // Explore all possible paths recursively
  for (const room of rooms) {
    console.log('exploring 2+ paths'); // TODO: Remove
    visitRoom(cave, room.position);
    if (solveDungeon(cave, [...path, room.position])) {
      console.log('END: Really found gold');
      throw true;
    }
  }

  console.log('END: No gold found anywhere'); // TODO: Remove
  return false;
}

function visitRoom(cave, pos) {
  console.log(`[VISIT] visiting [${pos[0]}, ${pos[1]}]`) // TODO: Remove
  const [row, col] = pos;
  cave[row][col] = CaveRoom.Visited;
}

/**
 * @param {Cave} cave 
 * @param {Position} pos 
 * @param {Object} [options]
 * @param {boolean} options.killWumpus
 * @returns {NeighborCaveRoom[]}
 */
function getValidNeighborRooms(cave, pos, options) {

  /** @type {NeighborCaveRoom[]} */
  const neighbors = [];

  for (const dir of Object.values(Direction)) {
    const nextPos = getNextPosition(pos, dir);
    const [nextRow, nextCol] = nextPos;

    // Skip out of bound positions
    if (
      nextRow < 0 || nextRow >= cave.length ||
      nextCol < 0 || nextCol >= cave.length
    ) {
      continue;
    }

    const room = cave[nextRow][nextCol];

    // Optionally kill the Wumpus when seeing it
    if (options.killWumpus && room === CaveRoom.Wumpus) {
      cave[nextRow][nextCol] = CaveRoom.Empty;
    }

    switch (room) {
      case CaveRoom.Empty:
      case CaveRoom.Gold:
        neighbors.push({ type: room, position: nextPos });
        break;
      case CaveRoom.Wumpus:
        if (killWumpus) {
          cave[nextRow][nextCol] = CaveRoom.Empty;
          neighbors.push({ type: room, position: nextPos });
        }
        break;
    }
  }

  return neighbors;
}

/**
 * @param {Position} pos 
 * @param {DirectionType} dir 
 * @returns {Position}
 */
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