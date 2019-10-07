// https://www.codewars.com/kata/5a70285ab17101627a000024/train/javascript

const YAY = 'O';
const NAY = 'X';
const SEPARATOR = '\n';
const DISTRICTS = 5; // <-- Change here!
const NO_DISTRICT = 0;
const TEMPORARY_WALL = DISTRICTS + 1;
const MOVES = [
  [-1, 0], // Up
  [0, +1], // Right
  [+1, 0], // Down
  [0, -1], // Left
];

/**
 * Returns an integer regardless of passing an even or odd number
 * 
 * @param integer n
 * @return integer
 */
const halfPlusOne = (n) => parseInt(n / 2) + 1;

/**
 * Returns an object containing these keys
 * 
 * - yays: number of favorable votes
 * - nays: number of unfavorable votes
 * - total: number of total voters
 * - length: number of columns
 * - height: number of rows
 * - board
 * 
 * @param string board 
 * @return object
 */
const analyzeBoard = (board) => {
  const rows = board.split(SEPARATOR);
  analysis.height = rows.length;
  analysis.length = rows[0].length;
  analysis.total = analysis.length * analysis.height;
  analysis.yays = 0;
  analysis.nays = 0;
  analysis.board = [];
  for (let i = 0, ii = rows.length; i < ii; i++) {
    const row = rows[i];
    const newBoard = [];
    for (let j = 0, jj = row.length; j < jj; j++) {
      const cell = row[j];
      if (cell === YAY) {
        analysis.yays++;
        newBoard.push(YAY);
      } else {
        analysis.nays++;
        newBoard.push(NAY);
      }
    }
    analysis.board.push(newBoard);
  }
  return analysis;
};

/**
 * Returns a 2D array initialized with given value
 * 
 * @param integer length 
 * @param integer height 
 * @param mixed initialValue 
 */
const initBoard = (length, height, initialValue = 0) => {
  const board = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < length; j++) {
      row.push(initialValue);
    }
    board.push(row);
  }
  return board;
}

const gerrymander = (board) => {

  const analysis = analyzeBoard(board);
  const minDistrictsToWin = halfPlusOne(DISTRICTS);
  const wastedDistricts = DISTRICTS - minDistrictsToWin;
  const votesPerDistrict = analysis.total / DISTRICTS;
  const minYaysPerDistrict = halfPlusOne(votesPerDistrict);
  const naysInYayDistrict = votesPerDistrict - minYaysPerDistrict;
  const wastedVotes = analysis.yays - (minYaysPerDistrict * minDistrictsToWin);
  const boardVotes = analysis.board;
  const boardDistricts = initBoard(analysis.length, analisys.height, NO_DISTRICT);
  const paths = [];

  const current = {
    pos: [0, 0],
    path: [],
    yays: 0,
    nays: 0,
    districts: 0,
    inDistrict: 0,
    districtId: 0,
    yayDistricts: 0,
    wastedYays: 0,
    wastedDistricts: 0,
    probableDistrictType: ''
  };

  buildingDistricts:
  while (true) {

    current.path = [];
    current.yays = 0;
    current.nays = 0;
    current.districtId++;
    current.inDistrict = 0;

    // Find first available position horizontally (top to bottom, left to right)
    for (let i = 0, ii = boardDistricts.length; i < ii; i++) {
      for (let j = 0, jj = boardDistricts[j].length; j < jj; j++) {
        if (boardDistricts[i][j] === NO_DISTRICT) {
          const pos = [i, j];
          const vote = boardVotes[i][j];
          current.pos = [...pos];
          current.path.push([...pos]);
          boardDistricts[nextPos[0]][nextPos[1]] = current.districtId;
          
          if (vote === YAY) {
            current.yays++;
            current.probableDistrictType = YAY;
          } else {
            current.nays++;
            current.probableDistrictType = NAY;
          }

        }
      }
    }

    buildingDistrict:
    while (true) {

      lookingAround:
      for (let move of MOVES) {
        
        let nextPos = [current.pos[0] + move[0], current.pos[1] + move[1]];

        // Out of bound?
        if (typeof boardVotes[nextPos[0]] === 'undefined') {
          continue lookingAround;
        }
        if (typeof boardVotes[nextPos[0]][nextPos[1]] === 'undefined') {
          continue lookingAround;
        }

        // Is next position taken?
        if (boardDistricts[nextPos[0]][nextPos[1]] !== NO_DISTRICT) {
          continue lookingAround;
        }

        const nextVote = boardVotes[nextPos[0]][nextPos[1]];

        // Next vote is yay
        if (nextVote === YAY) {

          // Too many wasted yays?
          if (current.wastedYays ===  wastedYays) {
            continue lookingAround;
          }

          // Too many nays in this district?
          if (current.yays === minYaysPerDistrict) {
            continue lookingAround;
          }

          current.pos = [...nextPos];
          boardDistricts[nextPos[0]][nextPos[1]] = current.districtId;
          current.path.push([...nextPos]);
          current.yays++;
          current.InDistrict++;
          if (current.probableDistrictType === NAY) {
            current.wastedYays++;
          }
          break lookingAround;
        }
        
        // Next vote is nay
        else {
          if (
            current.probableDistrictType === YAY &&
            current.nays === naysInYayDistrict
          ) {
            continue buildingDistricts;
          }
          current.pos = [...nextPos];
          boardDistricts[nextPos[0]][nextPos[1]] = current.districtId;
          current.path.push([...nextPos]);
          current.nays++;
          current.InDistrict++;
          // TODO: Remove any TEMPORARY_WALL after sealing the district
          break lookingAround;
        }
      }

      // End district here
      if (current.inDistrict === votesPerDistrict) {
        paths.push([...current.path]);
        if (current.probableDistrictType === YAY) {
          current.yayDistricts++;
        } else {
          current.wastedDistricts++;
        }
        break buildingDistrict;
      }

      // Go back?
      const prevPos = current.path.pop();
      if (!current.path.length) {
        // TODO: Go back to previous district
        // TODO: Block the old position with a TEMPORARY_WALL
      }

    }

    // End all districts
    if (current.yayDistricts + current.wastedDistricts === DISTRICTS) {
      break buildingDistricts;
    }
  }

  // Output the board
  return boardDistricts
    .map(row => row.join(''))
    .join('\n');
}
