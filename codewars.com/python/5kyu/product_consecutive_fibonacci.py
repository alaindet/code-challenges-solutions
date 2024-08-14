from dataclasses import dataclass

def product_fib(product: int) -> list[int, int, bool]:
    """
    https://www.codewars.com/kata/5541f58a944b85ce6d00006a/train/python

    If given product can be expressed with two Fibonacci numbers, return them
    Otherwise, return the smallest Fibonacci numbers whose product is more than
    given product
    """

    a, b = 0, 1
    while (True):
        current_product = a * b

        if (current_product < product):
            a, b = b, a + b
            continue

        return [a, b, current_product == product]

# -----------------------------------------------------------------------------

@dataclass
class TestCase:
    name: str
    input: int
    expected: list[int, int, bool]

    def run(self) -> None:
        result = product_fib(self.input)
        assert result == self.expected, f'Expected: {self.expected}, got {result}'

test_cases: list[TestCase] = [
    TestCase(
        name='#1',
        input=4895,
        expected=[55, 89, True],
    ),
    TestCase(
        name='#2',
        input=5895,
        expected=[89, 144, False],
    ),
]

for test_case in test_cases:
    try:
        test_case.run()
        print(f'OK: {test_case.name}')
    except AssertionError as e:
        print(f'Error: {test_case.name}: {e.__str__()}')