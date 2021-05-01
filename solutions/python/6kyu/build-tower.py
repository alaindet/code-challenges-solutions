# https://www.codewars.com/kata/576757b1df89ecf5bd00073b/train/python

from typing import List

def tower_builder(floors: int) -> List[str]:

    result = []

    for i in range(floors):
        gap = ' ' * (floors - i - 1)
        bricks = '*' * (i * 2 + 1)
        result.append(gap + bricks + gap)

    return result

for floor in tower_builder(10):
    print(floor)
