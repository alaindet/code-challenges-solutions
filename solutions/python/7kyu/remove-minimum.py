# https://www.codewars.com/kata/563cf89eb4747c5fb100001b/train/python

from typing import List

def remove_smallest(numbers: List[int]) -> List[int]:

    numbers_count = len(numbers)

    if numbers_count == 0:
        return []

    smallest_value = min(numbers)
    result = []

    for index in range(numbers_count):
        current_value = numbers[index]
        if current_value == smallest_value:
            break
        result.append(current_value)

    return result + numbers[index+1:]


tests = (
    {
        'asserted': remove_smallest([1, 2, 3, 4, 5]),
        'expected': [2, 3, 4, 5],
    },
    {
        'asserted': remove_smallest([5, 3, 2, 1, 4]),
        'expected': [5, 3, 2, 4],
    },
    {
        'asserted': remove_smallest([1, 2, 3, 1, 1]),
        'expected': [2, 3, 1, 1],
    }
)

def serialize_list(the_list: List) -> str:
    the_list.sort()
    return ','.join([str(x) for x in the_list])

for test in tests:
    asserted = serialize_list(test['asserted'])
    expected = serialize_list(test['expected'])
    print('PASSED' if asserted == expected else 'NOT PASSED')
