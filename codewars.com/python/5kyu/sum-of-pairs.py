# https://www.codewars.com/kata/54d81488b981293527000c8f/train/python

def sum_pairs(numbers: list[int], target_sum: int) -> list[int, int]:
    """
    Thanks to
    https://www.codewars.com/kata/reviews/54d8214ccc06a73daa0000b4/groups/54d8b4929e937cd18600030a
    """
    visited = set()

    for right in numbers:
        left = target_sum - right

        print(f'left={left:02} right={right:02}, visited={visited}')

        if left in visited:
            return [left, right]

        visited.add(right)

# -----------------------------------------------------------------------------

# Prepare a big list for stressing the function
big_input_numbers = [1] * 10_000_000
big_input_numbers[len(big_input_numbers) // 2 - 1] = 6
big_input_numbers[len(big_input_numbers) // 2] = 7
big_input_numbers[len(big_input_numbers) - 2] = 8
big_input_numbers[len(big_input_numbers) - 1] = -3
big_input_numbers[0] = 13
big_input_numbers[1] = 3

class SumPairsTestCase:
    name: str
    input_numbers: list[int]
    input_sum: int
    expected: list[int] | None

    def __init__(
        self,
        name: str,
        input_numbers: list[int],
        input_sum: int,
        expected: list[int],
    ):
        self.name = name
        self.input_numbers = input_numbers
        self.input_sum = input_sum
        self.expected = expected

    def run(self) -> None:
        result = sum_pairs(self.input_numbers, self.input_sum)
        assert result == self.expected, f'Expected: {self.expected}, got {result}'

test_cases: list[SumPairsTestCase] = [
    SumPairsTestCase(
        name='Basic',
        input_numbers=[1, 4, 8, 7, 3, 15],
        input_sum=8,
        expected=[1, 7],
    ),
    SumPairsTestCase(
        name='Negatives',
        input_numbers=[1, -2, 3, 0, -6, 1],
        input_sum=-6,
        expected=[0, -6],
    ),
    SumPairsTestCase(
        name='No matches',
        input_numbers=[20, -13, 40],
        input_sum=-7,
        expected=None,
    ),
    SumPairsTestCase(
        name='First match from left #1',
        input_numbers=[1, 2, 3, 4, 1, 0],
        input_sum=2,
        expected=[1, 1],
    ),
    SumPairsTestCase(
        name='First match from left #2',
        input_numbers=[10, 5, 2, 3, 7, 5],
        input_sum=10,
        expected=[3, 7],
    ),
    SumPairsTestCase(
        name='Duplicates',
        input_numbers=[4, -2, 3, 3, 4],
        input_sum=8,
        expected=[4, 4],
    ),
    SumPairsTestCase(
        name='Zeroes',
        input_numbers=[0, 2, 0],
        input_sum=0,
        expected=[0, 0],
    ),
    SumPairsTestCase(
        name='Subtraction',
        input_numbers=[5, 9, 13, -3],
        input_sum=10,
        expected=[13, -3],
    ),
    SumPairsTestCase(
        name='Ten million numbers with middle pair',
        input_numbers=big_input_numbers,
        input_sum=13,
        expected=[6, 7],
    ),
    SumPairsTestCase(
        name='Ten million numbers with pair at end',
        input_numbers=big_input_numbers,
        input_sum=5,
        expected=[8, -3],
    ),
    SumPairsTestCase(
        name='Ten million numbers with pair at start',
        input_numbers=big_input_numbers,
        input_sum=16,
        expected=[13, 3],
    ),
    SumPairsTestCase(
        name='Ten million numbers with no match',
        input_numbers=big_input_numbers,
        input_sum=31,
        expected=None,
    ),
]

for test_case in test_cases:
    try:
        test_case.run()
        print(f'OK: {test_case.name}')
    except AssertionError as e:
        print(f'Error: {test_case.name}: {e.__str__()}')