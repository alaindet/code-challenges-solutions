// https://www.codewars.com/kata/57680d0128ed87c94f000bfd/train/javascript

const copyBoard = (board) => {
  return board.reduce((newBoard, row) => {
    newBoard.push(row.reduce((newRow, letter) => {
      newRow.push(letter);
      return newRow;
    }, []));
    return newBoard;
  }, []);
};

const copyPosition = pos => ({i: pos.i, j: pos.j});

const lookAround = (board, pos, nextLetter) => {
  return [
    { i: -1, j: +0 }, // up
    { i: -1, j: +1 }, // up-right
    { i: +0, j: +1 }, // right
    { i: +1, j: +1 }, // down-right
    { i: +1, j: +0 }, // down
    { i: +1, j: -1 }, // down-left
    { i: +0, j: -1 }, // left
    { i: -1, j: -1 }  // up-left
  ].reduce((nextPositions, move) => {

    // Next position
    const next = { i: pos.i + move.i, j: pos.j + move.j };

    // Errors
    if (typeof (board[next.i]) === 'undefined') return nextPositions;
    if (typeof (board[next.i][next.j]) === 'undefined') return nextPositions;
    if (board[next.i][next.j] !== nextLetter) return nextPositions;

    // Store next position
    nextPositions.push(copyPosition(next));
    return nextPositions;
  }, []);
};

const wonderFromPosition = (_board, pos0, wordLetters) => {

  const board = copyBoard(_board);
  let pos = copyPosition(pos0);
  const backup = [];

  for (var l = 0, ll = wordLetters.length - 1; l < ll; l++) {

    // Calculate next positions
    var nextPositions = lookAround(board, pos, wordLetters[l + 1]);

    // Possible moves: 0
    if (!nextPositions.length) {

      // No backups, you're screwed!
      if (backup.length == 0) return false;

      // Disable current cell and get back to the last backup
      board[pos.i][pos.j] = undefined;
      const lastBackup = backup.pop();
      l = lastBackup.l - 1;
      pos = copyPosition(lastBackup.pos);
    }

    // Possible moves: 1
    else if (nextPositions.length === 1) {
      board[pos.i][pos.j] = undefined;
      pos = copyPosition(nextPositions[0]);
    }

    // Possible moves: 2+
    else {
      backup.push({ pos: copyPosition(pos), l: l+0 });
      pos = copyPosition(nextPositions[0]);
    }
  }

  return true;
};

const checkWord = (board, word) => {

  const wordLetters = word.split('');

  // Loop on all cells
  for (let i = 0, ii = board.length; i < ii; i++) {
    for (let j = 0, jj = board[i].length; j < jj; j++) {

      // Found the first letter
      if (board[i][j] === wordLetters[0]) {

        // Just a 1-letter word, gotcha!
        if (wordLetters.length === 1) return true;

        // Wonder on all possible paths from this position
        if (wonderFromPosition(board, {i,j}, wordLetters)) return true;
      }
    }
  }
  return false;
};

// Testing
console.log(
  [
    { arg: 'C', expected: true },
    { arg: 'EAR', expected: true },
    { arg: 'EARS', expected: false },
    { arg: 'BAILER', expected: true },
    { arg: 'RSCAREIOYBAILNEA', expected: true },
    { arg: 'CEREAL', expected: false },
    { arg: 'ROBES', expected: false },
    { arg: 'BAKER', expected: false },
    { arg: 'CARS', expected: false }
  ].reduce((log, test) => {

    const testBoard = [
      ['E', 'A', 'R', 'A'],
      ['N', 'L', 'E', 'C'],
      ['I', 'A', 'I', 'S'],
      ['B', 'Y', 'O', 'R']
    ];

    const actual = checkWord(testBoard, test.arg);

    return [
      log,
      `arg: ${test.arg}\n`,
      `actual: ${actual}\n`,
      `expected: ${test.expected}\n`,
      `${actual !== test.expected ? 'NOT ' : ''}PASSED\n\n`
    ].join('');

  }, "")
);
