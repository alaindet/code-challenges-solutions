<?php

// https://www.codewars.com/kata/56882731514ec3ec3d000009/train/php

/**
 * Gets the opposite player given two and only players
 *
 * @param string $player
 * @param string[] $players A set of TWO players to cycle upon
 * @return string
 */
function getOpponentPlayer(string $player, array $players): string
{
    return ($player === $players[0]) ? $players[1] : $players[0];
}

/**
 * Given a position and a direction, it returns an array of 7 or less
 * coordinates in that direction, centered on the position
 * 
 * Directions:
 * - horizontal
 * - vertical
 * - ascending
 * - descending
 *
 * @param array $grid
 * @param array $pos [int $col, int $row]
 * @param string $dir
 * @return bool
 */
function getLine(array &$grid, array $pos, string $dir): array
{
    $line = [];

    // Get positive direction of given string direction
    $sign = [
        "horizontal" => [1, 0],
        "vertical"   => [0, 1],
        "ascending"  => [1, 1],
        "descending" => [1, -1],
    ][$dir];

    for ($offset = -10; $offset <= 10; $offset++) {

        // Calculate new coordinates
        $_col = $pos[0] + $offset * $sign[0];
        $_row = $pos[1] + $offset * $sign[1];

        // Out of bound cell?
        if (!isset($grid[$_col])) continue;
        if (!isset($grid[$_col][$_row])) continue;

        // Add to result line
        $line[] = [$_col, $_row];
    }

    return $line;
}

/**
 * Checks a single line crossing the current position to check
 * If the current player won after his/her move
 *
 * @param array $grid
 * @param int $player
 * @param array $pos
 * @param string $dir
 * @return bool
 */
function checkLine(array &$grid, int $player, array $pos, string $dir): bool
{
    $sequence = 0;

    foreach (getLine($grid, $pos, $dir) as $cell) {

        // Read the cell
        $value = $grid[$cell[0]][$cell[1]];

        // Increment or reset the sequence
        $sequence = ($value === $player) ? $sequence + 1 : 0;

        // The player won!
        if ($sequence === 4) {
            return true;
        }

    }

    return false;
}

/**
 * Checks if the current player won the game
 * By looking around the last token played
 *
 * @param array $grid
 * @param int $player
 * @param int $col
 * @param int $row
 * @return bool Current player won?
 */
function hasPlayerWon(array &$grid, int $player, int $col, int $row): bool
{
    if (
        checkLine($grid, $player, [$col, $row], "vertical")   ||
        checkLine($grid, $player, [$col, $row], "horizontal") ||
        checkLine($grid, $player, [$col, $row], "ascending")  ||
        checkLine($grid, $player, [$col, $row], "descending")
    ) {
        return true;
    }

    return false;
}

/**
 * Logs the current board state in the terminal, with colors
 *
 * @param array $grid
 * @param array $players
 * @param int $turn
 * @return string
 */
// function logStatus(array &$grid, array $players, int $turn): string
// {       
//     $rotated = [];

//     $symbols = [
//         "Y" => "\e[0;30;43m Y \e[0m",
//         "R" => "\e[1;37;41m R \e[0m",
//     ];
//     $playerNames = array_flip($players);
//     foreach ($playerNames as &$player) {
//         $player = $symbols[$player[0]];
//     }
//     $playerNames[0] = "\e[1;37;40m 0 \e[0m";

//     for ($row = 5; $row >= 0; $row--) {
//         $newRow = [];
//         for ($col = 0; $col <= 6; $col++) {
//             $playerIndex = $grid[$col][$row];
//             $newRow[] = $playerNames[$playerIndex];
//         }
//         $rotated[] = $newRow;
//     }

//     for ($i = 0, $len = count($rotated); $i < $len; $i++) {
//         $rotated[$i] = array_merge([$i + 1], $rotated[$i]);
//     }
//     $rotated[] = explode(".", " . A . B . C . D . E . F . G ");

//     return (
//         "\n\n".
//         "Turn {$turn}\n===\n" .
//         implode("\n",
//             array_map(function ($row) {
//                 return implode("|", $row);
//             }, $rotated)
//         ) .
//         "\n\n"
//     );
// }

/**
 * Parses a list of moves of the Connect Four game and returns the winner
 *
 * @param array $moves
 * @return string The winner ("Yellow" or "Red") or "Draw"
 */
function whoIsWinner(array $moves): string
{
    // Initialize grid (it's rotated by 90 degrees clockwise)
    // > ROWS
    // v COLUMNS
    $grid = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];

    $columnIndices = array_flip(str_split("ABCDEFG"));
    $columnCounters = [0, 0, 0, 0, 0, 0, 0];
    $players = [];
    $arePlayersSet = false;

    foreach ($moves as $move) {

        $instructions = explode("_", $move);
        $columnLetter = $instructions[0];
        $playerName = $instructions[1];

        if (!$arePlayersSet) {
            $arePlayersSet = true;
            $opponentName = getOpponentPlayer($playerName, ["Yellow", "Red"]);
            $players = [ $playerName => 1, $opponentName => 2 ];
        }

        $playerIndex = $players[$playerName];
        $columnIndex = $columnIndices[$columnLetter];
        $rowIndex = $columnCounters[$columnIndex]++;
        $grid[$columnIndex][$rowIndex] = $playerIndex;

        if (hasPlayerWon($grid, $playerIndex, $columnIndex, $rowIndex)) {
            return $playerName;
        }
    }

    // No one has won yet but we ran out of moves: draw
    return "Draw";
}

// ==== TEST ==================================================================
class Test
{
    public $expected;
    public $input;
    public $message;

    public function __construct($expected, $input, string $message = null)
    {
        $this->expected = $expected;

        if (!is_array($input)) {
            $input = [$input];
        }

        $this->input = $input;

        if (isset($message)) {
            $this->message = $message;
        }
    }
}

class Tests
{
    public $cases = [];
    public $log = "";
    public $counter = 0;
    public $funcName = "";

    public function addCase(Test $case): void
    {
        $this->cases[] = $case;
    }

    public function run(): string
    {
        $this->counter = 0;
        $this->log = "";
        $func = $this->funcName;
        $o = [];
        
        foreach ($this->cases as $case) {
            $this->counter++;
            $assertion = $func(...$case->input);
            if ($case->expected === $assertion) {
                $o[] = "Test #{$this->counter}: PASSED";
            } else {
                $o[] = implode("\n", [
                    "\n===",
                    "Test #{$this->counter}",
                    "NOT PASSED",
                    "Assertion: {$assertion}",
                    "Expected: {$case->expected}",
                    "Message: " . $case->message ?? "No error message",
                    "===\n"
                ]);
            }
        }

        return $this->log = implode("\n", $o);
    }
}

$tests = new Tests();
$tests->funcName = "whoIsWinner";

foreach ([
    [ // Test #1
        "Yellow",
        [[
            "C_Yellow", "E_Red", "G_Yellow", "B_Red",
            "D_Yellow", "B_Red", "B_Yellow", "G_Red",
            "C_Yellow", "C_Red", "D_Yellow", "F_Red",
            "E_Yellow", "A_Red", "A_Yellow", "G_Red",
            "A_Yellow", "F_Red", "F_Yellow", "D_Red",
            "B_Yellow", "E_Red", "D_Yellow", "A_Red",
            "G_Yellow", "D_Red", "D_Yellow", "C_Red"
        ]]
    ],
    [ // Test #2
        "Yellow",
        [[
            "C_Yellow", "B_Red", "B_Yellow", "E_Red",
            "D_Yellow", "G_Red", "B_Yellow", "G_Red",
            "E_Yellow", "A_Red", "G_Yellow", "C_Red",
            "A_Yellow", "A_Red", "D_Yellow", "B_Red",
            "G_Yellow", "A_Red", "F_Yellow", "B_Red",
            "D_Yellow", "A_Red", "F_Yellow", "F_Red",
            "B_Yellow", "F_Red", "F_Yellow", "G_Red",
            "A_Yellow", "F_Red", "C_Yellow", "C_Red",
            "G_Yellow", "C_Red", "D_Yellow", "D_Red",
            "E_Yellow", "D_Red", "E_Yellow", "C_Red",
            "E_Yellow", "E_Red"
        ]]
    ],
    [ // Test #3
        "Red",
        [[
            "F_Yellow", "G_Red", "D_Yellow", "C_Red",
            "A_Yellow", "A_Red", "E_Yellow", "D_Red",
            "D_Yellow", "F_Red", "B_Yellow", "E_Red",
            "C_Yellow", "D_Red", "F_Yellow", "D_Red",
            "D_Yellow", "F_Red", "G_Yellow", "C_Red",
            "F_Yellow", "E_Red", "A_Yellow", "A_Red",
            "C_Yellow", "B_Red", "E_Yellow", "C_Red",
            "E_Yellow", "G_Red", "A_Yellow", "A_Red",
            "G_Yellow", "C_Red", "B_Yellow", "E_Red",
            "F_Yellow", "G_Red", "G_Yellow", "B_Red",
            "B_Yellow", "B_Red"
        ]]
    ],
    [ // Test #4
        "Red",
        [[
            "A_Yellow", "B_Red", "B_Yellow", "C_Red",
            "G_Yellow", "C_Red", "C_Yellow", "D_Red",
            "G_Yellow", "D_Red", "G_Yellow", "D_Red",
            "F_Yellow", "E_Red", "D_Yellow"
        ]]
    ],
    [ // Test #5
        "Yellow",
        [[
            "A_Red", "B_Yellow", "A_Red", "B_Yellow",
            "A_Red", "B_Yellow", "G_Red", "B_Yellow"
        ]]
    ],
    [ // Test #6
        "Draw",
        [[
            "A_Red", "B_Yellow", "A_Red", "E_Yellow",
            "F_Red", "G_Yellow", "A_Red", "G_Yellow"
        ]]
    ]
] as $test) {
    $tests->addCase(new Test(
        $expected = $test[0],
        $input = $test[1],
        $errorMessage  = $test[2] ?? "No error message"
    ));
}

echo $tests->run();
