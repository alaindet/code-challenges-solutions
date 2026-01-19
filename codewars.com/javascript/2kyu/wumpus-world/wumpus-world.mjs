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

export function wumpusWorld(cave) {
  const pos = [0, 0];
  const path = [pos];
  visitRoom(cave, pos);
  return solveDungeon(cave, path);
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
  const position = path[path.length - 1];
  const rooms = getValidNeighborRooms(cave, position);

  // No valid neighbor room, it's a dead end
  if (rooms.length === 0) {
    return false;
  }

  // We found the treasure, dungeon solved
  if (rooms.includes(room => room.type === CaveRoom.Gold)) {
    return true;
  }

  // Zugzwang, only one move is possible
  if (rooms.length === 1) {
    visitRoom(cave, rooms[0].position)
    return solveDungeon(cave, [...path, rooms[0].position]);
  }

  // Explore all possible path recursively
  for (const room of rooms) {
    visitRoom(cave, room.position);
    return solveDungeon(cave, [...path, room.position]);
  }
}

function visitRoom(cave, pos) {
  const [row, col] = pos;
  cave[row][col] = CaveRoom.Visited;
}

function getValidNeighborRooms(cave, pos) {
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

    switch (room) {
      case CaveRoom.Empty:
      case CaveRoom.Gold:
        neighbors.push({ type: room, position: nextPos });
        break;
    }
  }

  return neighbors;
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