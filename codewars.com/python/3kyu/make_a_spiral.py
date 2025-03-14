"""
Reference
https://www.codewars.com/kata/534e01fbbb17187c7e0000c6/train/python
"""

from enum import Enum
from typing import TypeAlias

Grid: TypeAlias = list[list[int]]


class Direction(Enum):
    TOP = 1
    RIGHT = 2
    BOTTOM = 3
    LEFT = 4


def next_clockwise_direction(dir: Direction) -> Direction:
    match dir:
        case Direction.RIGHT:
            return Direction.BOTTOM
        case Direction.BOTTOM:
            return Direction.LEFT
        case Direction.LEFT:
            return Direction.TOP
        case Direction.TOP:
            return Direction.RIGHT


class Position:
    def __init__(self, row: int, col: int) -> None:
        self.row = row
        self.col = col

    def move(self, direction: Direction) -> None:
        match direction:
            case Direction.TOP:
                self.row += -1
            case Direction.RIGHT:
                self.col += 1
            case Direction.BOTTOM:
                self.row += 1
            case Direction.LEFT:
                self.col += -1


class Spiral:
    def __init__(self, size: int, empty_cell: int = 0, filled_cell: int = 1):
        self.size = size
        self.empty_cell = empty_cell
        self.filled_cell = filled_cell
        self.grid = self.create_empty_grid(self.size)
        self.pos = Position(0, 0)
        self.dir = Direction.RIGHT

    def create_empty_grid(self, size: int) -> Grid:
        row = [self.empty_cell for _ in range(size)]
        return [row.copy() for _ in range(size)]

    def fill_cell(self, pos: Position) -> None:
        self.grid[pos.row][pos.col] = self.filled_cell

    def reset(self) -> None:
        self.grid = self.create_empty_grid(self.size)
        self.pos = Position(0, 0)
        self.dir = Direction.RIGHT

    def _draw_outer_arms(self) -> None:
        self.fill_cell(self.pos)
        arm_length = self.size - 1
        arms_count = 3

        for _ in range(arms_count):
            for _ in range(arm_length):
                self.fill_cell(self.pos)
                self.pos.move(self.dir)
            self.dir = next_clockwise_direction(self.dir)

        if self.size % 2 == 1:
            self.fill_cell(self.pos)

    def _draw_inner_arms(self) -> None:
        arms_count = 2
        arm_length = self.size - 1

        while True:
            arm_length -= 2

            if arm_length <= 0:
                if self.size % 2 == 1:
                    self.fill_cell(self.pos)
                break

            for _ in range(arms_count):
                for _ in range(arm_length):
                    self.fill_cell(self.pos)
                    self.pos.move(self.dir)
                self.dir = next_clockwise_direction(self.dir)

    def draw(self) -> None:
        self._draw_outer_arms()
        self._draw_inner_arms()


def spiralize(size: int) -> Grid:
    spiral = Spiral(size)
    spiral.draw()
    return spiral.grid


def debug(grid: list[list[int]]):
    """TODO: Remove"""
    print(
        '\n'.join([
            ' '.join([
                '@' if cell == 1 else '-'
                for cell in row
            ])
            for row in grid
        ])
    )


if __name__ == "__main__":
    grid = spiralize(8)
    debug(grid)
