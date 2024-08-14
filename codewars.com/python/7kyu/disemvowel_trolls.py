# https://www.codewars.com/kata/52fba66badcd10859f00097e/train/python

vowels = {'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'}

def disemvowel(input: str) -> str:
    global vowels
    return ''.join([c for c in input if c not in vowels])

# -----------------------------------------------------------------------------

test_cases: list[tuple[str, str]] = [
    (
        'This website is for losers LOL!',
        'Ths wbst s fr lsrs LL!',
    ),
    (
        'No offense but,\nYour writing is among the worst I\'ve ever read',
        'N ffns bt,\nYr wrtng s mng th wrst \'v vr rd',
    ),
    (
        'What are you, a communist?',
        'Wht r y,  cmmnst?',
    ),
]

for test_case in test_cases:
    given, expected = test_case
    result = disemvowel(given)
    outcome = result == expected
    print('PASSED' if outcome else 'NOT PASSED')