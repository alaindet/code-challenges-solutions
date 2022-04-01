/**
 * This returns a utility to navigate string grids
 *
 * x is vertical and positive down
 * y is horizontal and positive right
 *
 * @param string grid
 * @returns object
 */
module.exports = grid => {

  const width = (grid.match(/\n/g)?.length ?? 0) + 1;
  const height = grid.indexOf('\n');

  const lookUp = coord => {
    const newCoord = coord - height - 1;
    if (newCoord < 0) return null;
    return grid[newCoord];
  };

  const lookRight = coord => {
    const newCoord = coord + 1;
    if (newCoord > grid.length) return null;
    if (grid[newCoord] === '\n') return null;
    return grid[newCoord];
  };

  const lookDown = coord => {
    const newCoord = coord + height + 1;
    if (newCoord > grid.length) return null;
    return grid[newCoord];
  };

  const lookLeft = coord => {
    const newCoord = coord - 1;
    if (newCoord < 0) return null;
    if (grid[newCoord] === '\n') return null;
    return grid[newCoord];
  };

  return {
    grid,
    width,
    height,
    lookUp,
    lookRight,
    lookDown,
    lookLeft,
  };
};
