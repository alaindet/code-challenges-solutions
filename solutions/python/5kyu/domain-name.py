# https://www.codewars.com/kata/514a024011ea4fb54200004b/train/python

from re import search

def domain_name(url: str) -> str:
    pattern = '^(?:http:\/\/|https:\/\/|)(?:www\.|)([^.]+)\.'
    return search(pattern, url).group(1)

tests = [
    {
        'assertion': domain_name('http://google.com'),
        'expected': 'google'
    },
    {
        'assertion': domain_name('http://google.co.jp'),
        'expected': 'google'
    },
    {
        'assertion': domain_name('www.xakep.ru'),
        'expected': 'xakep'
    },
    {
        'assertion': domain_name('https://youtube.com'),
        'expected': 'youtube'
    },
    {
        'assertion': domain_name('github.com'),
        'expected': 'github'
    },
]

for test in tests:
    print('PASSED' if test['assertion'] == test['expected'] else 'NOT PASSED')
