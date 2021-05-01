# https://www.codewars.com/kata/52bc74d4ac05d0945d00054e/train/python


def first_non_repeating_letter(sentence: str) -> str:

    discarded = {}

    for char_index, char in enumerate(sentence):

        haystack = sentence[char_index+1:].lower()
        needle = sentence[char_index].lower()

        if needle in discarded:
            continue

        if needle not in haystack:
            return char

        discarded[needle] = True

    return ''


tests = [
    {
        'assertion': first_non_repeating_letter('a'),
        'expected': 'a'
    },
    {
        'assertion': first_non_repeating_letter('stress'),
        'expected': 't'
    },
    {
        'assertion': first_non_repeating_letter('moonmen'),
        'expected': 'e'
    },
    {
        'assertion': first_non_repeating_letter('abba'),
        'expected': ''
    },
    {
        'assertion': first_non_repeating_letter('~><#~><'),
        'expected': '#',
    },
    {
        'assertion': first_non_repeating_letter('KhI k nBHFWVE1z.sApxETrrGBJ:9d0A9niucigdSf:YB1GpRSiZ5Onc6'),
        'expected': 'W',
    },
]

for test in tests:
    print('PASSED' if test['assertion'] == test['expected'] else 'NOT PASSED')
