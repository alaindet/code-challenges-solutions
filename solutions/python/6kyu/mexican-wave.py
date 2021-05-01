# https://www.codewars.com/kata/58f5c63f1e26ecda7e000029/train/python

from typing import List

def uppercase_at(word: str, index: int) -> str:
    return word[:index] + word[index].upper() + word[index+1:]

def wave(people: str) -> List[str]:

    people_len = len(people)

    if people_len == 0:
        return []

    result = []

    for index in range(people_len):
        if people[index].isalpha():
            result.append(uppercase_at(people, index))

    return result


tests = [
    {
        'assertion': wave('hello'),
        'expected': ['Hello', 'hEllo', 'heLlo', 'helLo', 'hellO'],
    },
    {
        'assertion': wave('codewars'),
        'expected': ['Codewars', 'cOdewars', 'coDewars', 'codEwars',
                     'codeWars', 'codewArs', 'codewaRs', 'codewarS']
    },
    {
        'assertion': wave(' gap '),
        'expected': [' Gap ', ' gAp ', ' gaP ']
    },
]

for test in tests:
    print('PASSED' if test['assertion'] == test['expected'] else 'NOT PASSED')
