# https://www.codewars.com/kata/563cf89eb4747c5fb100001b/train/python

import unittest


def remove_smallest(numbers: list[int]) -> list[int]:

    numbers_count = len(numbers)

    if numbers_count == 0:
        return []
    
    min_value = min(numbers)
    result = []

    for index in range(numbers_count):
        current_value = numbers[index]
        if current_value == min_value:
            break
        result.append(current_value)

    return result + numbers[index+1:]


# -----------------------------------------------------------------------------

class TestRemoveSmallest(unittest.TestCase):
    def test_with_ordered_sequence(self):
        result = remove_smallest([1, 2, 3, 4, 5])
        self.assertListEqual(result, [2, 3, 4, 5])

    def test_with_random_sequence(self):
        result = remove_smallest([5, 3, 2, 1, 4])
        self.assertListEqual(result, [5, 3, 2, 4])

    def test_with_repeating_minimum(self):
        result = remove_smallest([1, 2, 3, 1, 1])
        self.assertListEqual(result, [2, 3, 1, 1])

if __name__ == '__main__':
    unittest.main(verbosity=2)