# https://www.codewars.com/kata/51b66044bce5799a7f000003/train/python

from typing import Union
from math import floor


class RomanNumerals:

    roman_to_decimal = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000,
    }

    magnitudes = {
        1000: ('', '', 'M'),
        100: ('M', 'D', 'C'),
        10: ('C', 'L', 'X'),
        1: ('X', 'V', 'I'),
    }

    @classmethod
    def to_roman(cls, decimal: int) -> Union[str, None]:

        if decimal == 0 or decimal > 3999:
            return None

        result = ''
        temp = decimal

        for magnitude in cls.magnitudes.keys():
            large, medium, small = cls.magnitudes[magnitude]
            units = floor(temp / magnitude)

            if units != 0:

                if units <= 3:
                    result += small * units
                elif units == 4:
                    result += small + medium
                elif units == 5:
                    result += medium
                elif units <= 8:
                    result += medium + (small * (units - 5))
                elif units == 9:
                    result += small + large
                elif units == 10:
                    result += large

                temp -= magnitude * units
                if temp == 0:
                    break

        print('to_roman', decimal, result)

        return result

    @classmethod
    def from_roman(cls, roman: str) -> int:

        result = 0
        i = 0

        for symbol in roman:
            value = cls.roman_to_decimal[symbol]
            try:
                next_symbol = roman[i + 1]
                next_value = cls.roman_to_decimal[next_symbol]
            except IndexError:
                next_value = 0
            factor = 1 if next_value <= value else -1
            result += value * factor
            i += 1

        return result

# -----------------------------------------------------------------------------


tests = [
    {
        'assertion': RomanNumerals.to_roman(1000),
        'expected': 'M',
    },
    {
        'assertion': RomanNumerals.to_roman(1990),
        'expected': 'MCMXC',
    },
    {
        'assertion': RomanNumerals.to_roman(3457),
        'expected': 'MMMCDLVII',
    },
    {
        'assertion': RomanNumerals.to_roman(8),
        'expected': 'VIII',
    },
    {
        'assertion': RomanNumerals.to_roman(401),
        'expected': 'CDI',
    },
    {
        'assertion': RomanNumerals.from_roman('MCMXCIX'),
        'expected': 1999,
    },
    {
        'assertion': RomanNumerals.from_roman('XXI'),
        'expected': 21,
    },
    {
        'assertion': RomanNumerals.from_roman('MMVIII'),
        'expected': 2008,
    },
]

for test in tests:
    print('PASSED' if test['assertion'] == test['expected'] else 'NOT PASSED')
