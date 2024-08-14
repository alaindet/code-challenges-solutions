# https://www.codewars.com/kata/55f8a9c06c018a0d6e000132/train/python

from re import compile

valid_pin_pattern = compile('^([0-9]{4}|([0-9]{6}))$')


def validate_pin(pin: str) -> bool:

    if len(pin.rstrip()) != len(pin):
        return False

    return valid_pin_pattern.search(pin) is not None


tests = (
    {
        'asserted': validate_pin('1234'),
        'expected': True,
    },
    {
        'asserted': validate_pin('12434'),
        'expected': False,
    },
    {
        'asserted': validate_pin('12t34'),
        'expected': False,
    },
    {
        'asserted': validate_pin('123456'),
        'expected': True,
    },
    {
        'asserted': validate_pin('123456\n'),
        'expected': False,
    }
)

for test in tests:
    asserted = test['asserted']
    expected = test['expected']
    print('PASSED' if asserted == expected else 'NOT PASSED')
