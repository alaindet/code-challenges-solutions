# https://www.codewars.com/kata/52597aa56021e91c93000cb0/train/python

def move_zeros(array: list) -> list:
    return [x for x in array if x != 0] + [0] * array.count(0)

# -----------------------------------------------------------------------------

tests = [
    {
        'assertion': move_zeros([1, 2, 0, 1, 0, 1, 0, 3, 0, 1]),
        'expected': [1, 2, 1, 1, 3, 1, 0, 0, 0, 0]
    },
    {
        'assertion': move_zeros([9, 0, 0, 9, 1, 2, 0, 1, 0, 1, 0, 3, 0, 1, 9, 0, 0, 0, 0, 9]),
        'expected': [9, 9, 1, 2, 1, 1, 3, 1, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        'assertion': move_zeros([0, 0]),
        'expected': [0, 0],
    },
    {
        'assertion': move_zeros([0]),
        'expected': [0],
    },
    {
        'assertion': move_zeros([]),
        'expected': [],
    },
]

for test in tests:
    print('PASSED' if test['assertion'] == test['expected'] else 'NOT PASSED')
