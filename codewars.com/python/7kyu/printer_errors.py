# https://www.codewars.com/kata/56541980fa08ab47a0000040/train/python

valid_chars = list('abcdefghijklm')
is_char_valid = lambda char: char in valid_chars

def printer_error(printed: str) -> str:
    errors_count = sum([0 if is_char_valid(char) else 1 for char in printed])
    return f'{errors_count}/{len(printed)}'


tests = (
    {
        'asserted': printer_error('aaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbmmmmmmmmmmmmmmmmmmmxyz'),
        'expected': '3/56',
    },
    {
        'asserted': printer_error('kkkwwwaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbmmmmmmmmmmmmmmmmmmmxyz'),
        'expected': '6/60',
    },
    {
        'asserted': printer_error('kkkwwwaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbmmmmmmmmmmmmmmmmmmmxyzuuuuu'),
        'expected': '11/65',
    }
)

for test in tests:
    asserted = test['asserted']
    expected = test['expected']
    print('PASSED' if asserted == expected else 'NOT PASSED')
