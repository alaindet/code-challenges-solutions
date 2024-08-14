from dataclasses import dataclass

# https://www.codewars.com/kata/51edd51599a189fe7f000015/train/python
def solution(list_a: list[int], list_b: list[int]) -> float:
    errs = [abs(b - a)**2 for a, b in zip(list_a, list_b)]
    return sum(errs) / len(errs)

# -----------------------------------------------------------------------------

@dataclass
class TestCase:
    name: str
    input_list_a: list[int]
    input_list_b: list[int]
    expected: float

    def run(self) -> None:
        result = solution(self.input_list_a, self.input_list_b)
        assert result == self.expected, f'Expected: {self.expected}, got {result}'

test_cases: list[TestCase] = [
    TestCase(
        name='#1',
        input_list_a=[1, 2, 3],
        input_list_b=[4, 5, 6],
        expected=9,
    ),
    TestCase(
        name='#2',
        input_list_a=[10, 20, 10, 2],
        input_list_b=[10, 25, 5, -2],
        expected=16.5,
    ),
    TestCase(
        name='#3',
        input_list_a=[0, -1],
        input_list_b=[-1, 0],
        expected=1,
    ),
    TestCase(
        name='#4',
        input_list_a=[10, 10],
        input_list_b=[10, 10],
        expected=0,
    ),
]

for test_case in test_cases:
    try:
        test_case.run()
        print(f'OK: {test_case.name}')
    except AssertionError as e:
        print(f'Error: {test_case.name}: {e.__str__()}')