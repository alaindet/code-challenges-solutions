# https://www.codewars.com/kata/541c8630095125aba6000c00/train/python

# My solution
def sum_of_digits(n):
    result = 0
    for digit in list(str(n)):
        result += int(digit)
    return result

def digital_root(n):
    result = sum_of_digits(n)
    while result > 9:
        result = sum_of_digits(result)
    return result

# An incredible solution by bartolomisha I had to share
# https://www.codewars.com/kata/541c8630095125aba6000c00/solutions/python
def digital_root(n):
    return n % 9 or n and 9

tests = [
    {
        'assertion': digital_root(16),
        'expected': 7
    },
    {
        'assertion': digital_root(942),
        'expected': 6
    },
    {
        'assertion': digital_root(132189),
        'expected': 6
    },
    {
        'assertion': digital_root(493193),
        'expected': 2
    },
    {
        'assertion': digital_root(123456789),
        'expected': 9,
    },
]

for test in tests:
    print('PASSED' if test['assertion'] == test['expected'] else 'NOT PASSED')
