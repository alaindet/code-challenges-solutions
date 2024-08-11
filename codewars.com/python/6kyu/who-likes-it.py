# https://www.codewars.com/kata/5266876b8f4bf2da9b000362/train/python

def likes(names: list[str]) -> str:
    match len(names):
        case 0:
            return 'no one likes this'
        case 1:
            name1, = names
            return f'{name1} likes this'
        case 2:
            name1, name2 = names
            return f'{name1} and {name2} like this'
        case 3:
            name1, name2, name3 = names
            return f'{name1}, {name2} and {name3} like this'
        case _:
            name1, name2, *others = names
            return f'{name1}, {name2} and {len(others)} others like this'
        
# -----------------------------------------------------------------------------

test_cases = [
    {
        'input': [],
        'expected': 'no one likes this',
    },
    {
        'input': ['Peter'],
        'expected': 'Peter likes this',
    },
    {
        'input': ['Jacob', 'Alex'],
        'expected': 'Jacob and Alex like this',
    },
    {
        'input': ['Max', 'John', 'Mark'],
        'expected': 'Max, John and Mark like this',
    },
    {
        'input': ['Alex', 'Jacob', 'Mark', 'Max'],
        'expected': 'Alex, Jacob and 2 others like this',
    },
]

for test_case in test_cases:
    result = likes(test_case['input'])
    outcome = result == test_case['expected']
    print('PASSED' if outcome else 'NOT PASSED')