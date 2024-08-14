# https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39/train/python

zero = lambda operation = None: operation(0) if operation is not None else 0
one = lambda operation = None: operation(1) if operation is not None else 1
two = lambda operation = None: operation(2) if operation is not None else 2
three = lambda operation = None: operation(3) if operation is not None else 3
four = lambda operation = None: operation(4) if operation is not None else 4
five = lambda operation = None: operation(5) if operation is not None else 5
six = lambda operation = None: operation(6) if operation is not None else 6
seven = lambda operation = None: operation(7) if operation is not None else 7
eight = lambda operation = None: operation(8) if operation is not None else 8
nine = lambda operation = None: operation(9) if operation is not None else 9

plus = lambda b: lambda a: a + b
minus = lambda b: lambda a: a - b
times = lambda b: lambda a: a * b
divided_by = lambda b: lambda a: a // b

tests = [
    {
        'assertion': seven(times(five())),
        'expected': 35
    },
    {
        'assertion': four(plus(nine())),
        'expected': 13
    },
    {
        'assertion': eight(minus(three())),
        'expected': 5
    },
    {
        'assertion': six(divided_by(two())),
        'expected': 3
    },
]

for test in tests:
    print('PASSED' if test['assertion'] == test['expected'] else 'NOT PASSED')
