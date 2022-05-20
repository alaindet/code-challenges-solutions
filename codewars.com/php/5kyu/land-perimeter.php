<?php

// https://www.codewars.com/kata/5839c48f0cf94640a20001d3/train/php

/**
 * Accepts a 2D map with land and sea tiles, can calculate land total perimeter
 * 
 * The map must consist of an array of strings, where each string is a
 * fixed-length sequence of land or sea symbols. Default symbols are "X" and "O"
 * respectively
 * 
 * Ex.:
 * $map = [
 *   'XOOXO',
 *   'XOOXO',
 *   'OOOXO',
 *   'XXOXO',
 *   'OXOOO'
 * ];
 */
class ArchipelagoCalculator
{
    private $map;
    private $mapRows;
    private $mapCols;
    private $land;
    private $sea;
    private $moves = [
        [-1,  0], // ^
        [ 0,  1], // >
        [ 0, -1], // <
        [ 1,  0], // v
    ];

    public function __construct(
        array $map = [],
        string $land = "X",
        string $sea = "O"
    )
    {
        $this->setMap($map);
        $this->land = $land;
        $this->sea = $sea;
    }

    public function setMap(array $map): void
    {
        if ($map === []) {
            $this->map = [];
            $this->mapRows = 0;
            $this->mapCols = 0;
        } else {
            $this->map = array_map(function($string) {
                return str_split($string);
            }, $map);
            $this->mapRows = count($this->map);
            $this->mapCols = count($this->map[0]);
        }
    }

    /**
     * Returns the number of neighbours (up, right, down, left) having the same
     * tile type as of given tile
     *
     * @param array $pos
     * @return int
     */
    private function getSameNeighbours(array $pos): int
    {
        $type = $this->map[$pos[0]][$pos[1]];
        $neighbours = 0;

        foreach ($this->moves as $move) {

            // Calculate neighbour position
            $newPos = [$pos[0] + $move[0], $pos[1] + $move[1]];

            // ERROR: Non-existing row
            if (!isset($this->map[$newPos[0]])) {
                continue;
            }

            // ERROR: Non-existing column
            if (!isset($this->map[$newPos[0]][$newPos[1]])) {
                continue;
            }

            if ($this->map[$newPos[0]][$newPos[1]] === $type) {
                $neighbours++;
            }
        }

        return $neighbours;
    }

    public function getIslandsPerimeter(): int
    {
        if ($this->map === []) {
            return 0;
        }

        $perimeter = 0;

        for ($row = 0; $row < $this->mapRows; $row++) {
            for ($col = 0; $col < $this->mapCols; $col++) {
                if ($this->map[$row][$col] === $this->land) {
                    $neighbours = $this->getSameNeighbours([$row, $col]);
                    $perimeter += 4 - $neighbours;
                }
            }
        }

        return $perimeter;
    }
}

function land_perimeter(array $map): string
{
    $archipelago = new ArchipelagoCalculator($map, "X", "O");
    $perimeter = $archipelago->getIslandsPerimeter();
    return "Total land perimeter: {$perimeter}";
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
$tests->funcName = "land_perimeter";

$tests->addCase(new Test(
    "Total land perimeter: 60",
    [
        [
            "OXOOOX",
            "OXOXOO",
            "XXOOOX",
            "OXXXOO",
            "OOXOOX",
            "OXOOOO",
            "OOXOOX",
            "OOXOOO",
            "OXOOOO",
            "OXOOXX"
        ]
    ]
));

$tests->addCase(new Test(
    "Total land perimeter: 52",
    [
        [
            "OXOOO",
            "OOXXX",
            "OXXOO",
            "XOOOO",
            "XOOOO",
            "XXXOO",
            "XOXOO",
            "OOOXO",
            "OXOOX",
            "XOOOO",
            "OOOXO"
        ]
    ]
));

$tests->addCase(new Test(
    "Total land perimeter: 40",
    [
        [
            "XXXXXOOO",
            "OOXOOOOO",
            "OOOOOOXO",
            "XXXOOOXO",
            "OXOXXOOX"
        ]
    ]
));

$tests->addCase(new Test(
    "Total land perimeter: 54",
    [
        [
            "XOOOXOO",
            "OXOOOOO",
            "XOXOXOO",
            "OXOXXOO",
            "OOOOOXX",
            "OOOXOXX",
            "XXXXOXO"
        ]
    ]
));

$tests->addCase(new Test(
    "Total land perimeter: 40",
    [
        [
            "OOOOXO",
            "XOXOOX",
            "XXOXOX",
            "XOXOOO",
            "OOOOOO",
            "OOOXOO",
            "OOXXOO"
        ]
    ]
));

echo $tests->run();
