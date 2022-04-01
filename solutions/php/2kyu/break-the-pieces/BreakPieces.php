<?php

// https://www.codewars.com/kata/527fde8d24b9309d9b000c4e/train/php
class BreakPieces {

    const NEVER_VISITED = -1;
    const BOUNDARY = 0;
    const DISPOSABLE = '.';

    private array $grid = [];

    private function shapeToGrid(string $shape): array {
        return array_map(
            fn($line) => str_split($line),
            explode("\n", $shape)
        );
    }

    private function checkAdjacentWhitespace($x, $y): ?int {

        $moves = [
            [-1, 0], // up
            [0, +1], // right
            [+1, 0], // down
            [0, -1], // left
        ];

        foreach ($moves as $move) {
            $newX = $x + $move[0];
            $newY = $y + $move[1];
            $cell = $this->grid[$newX][$newY];
            if (
                is_int($cell) &&
                $cell !== self::NEVER_VISITED &&
                $cell !== self::BOUNDARY
            ) {
                return $cell;
            }
        }

        return null;
    }

    private function cloneGrid(): array {
        $cloned = [];

        $xmax = count($this->grid);
        $ymax = count($this->grid[0]);

        for ($x = 0; $x < $xmax; $x++) {
            for ($y = 0; $y < $ymax; $y++) {
                $cloned[$x][$y] = $this->grid[$x][$y];
            }
        }

        return $cloned;
    }

    public function process(string $shape): array {
        $this->grid = $this->shapeToGrid($shape);
        $areasCounter = 0;
        $xmax = count($this->grid);
        $ymax = count($this->grid[0]);

        for ($x = 0; $x < $xmax; $x++) {
            for ($y = 0; $y < $ymax; $y++) {

                // Boundary
                if ($this->grid[$x][$y] != ' ') {
                    continue;
                }

                // Check for adjacent whitespace already assigned to an area
                $adjancentWhitespace = $this->checkAdjacentWhitespace($x, $y);

                if ($adjancentWhitespace !== null) {
                    $this->grid[$x][$y] = $adjancentWhitespace;
                    continue;
                }

                // Assign a new area
                $areasCounter++;
                $this->grid[$x][$y] = $areasCounter;
            }
        }

        $areas = [];
        for ($areaId = 1; $areaId <= $areasCounter; $areaId++) {
            $clonedGrid = $this->cloneGrid();
            for ($x = 0; $x < $xmax; $x++) {
                for ($y = 0; $y < $ymax; $y++) {
                    $cell = $clonedGrid[$x][$y];
                    if ($cell !== $areaId) {
                        $clonedGrid[$x][$y] = self::DISPOSABLE;
                    }
                }
            }
            $areas[] = $clonedGrid;
        }

        dd(
            implode("\n\n===\n\n", array_map(
                fn($area) => implode("\n", array_map(
                    fn($line) => implode("", $line),
                    $area,
                )),
                $areas,
            )) . "\n"
        );


        // TODO: Remove
        // dd(
        //     implode("\n", array_map(
        //         fn($line) => implode("", $line),
        //         $this->grid
        //     )) . "\n"
        // );

        return [];
    }
}
