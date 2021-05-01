# https://www.codewars.com/kata/5626b561280a42ecc50000d1/train/python

from typing import List


def sum_powers_of_digits(n: int) -> int:

    digits = [int(i) for i in list(str(n))]
    result = 0

    for digit_index in range(len(digits)):
        digit = digits[digit_index]
        result += digit ** (digit_index + 1)

    return result


def sum_dig_pow(a: int, b: int) -> List[int]:
    return [x for x in range(a, b + 1) if sum_powers_of_digits(x) == x]


tests = [
    {
        'assertion': sum_dig_pow(1, 10),
        'expected': [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
        'assertion': sum_dig_pow(1, 100),
        'expected': [1, 2, 3, 4, 5, 6, 7, 8, 9, 89]
    },
    {
        'assertion': sum_dig_pow(10, 100),
        'expected': [89]
    },
    {
        'assertion': sum_dig_pow(90, 100),
        'expected': []
    },
    {
        'assertion': sum_dig_pow(80, 150),
        'expected': [89, 135]
    },
]


for test in tests:
    print('PASSED' if test['assertion'] == test['expected'] else 'NOT PASSED')
