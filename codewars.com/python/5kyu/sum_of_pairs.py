# https://www.codewars.com/kata/54d81488b981293527000c8f/train/python

import unittest


def sum_pairs(numbers: list[int], target_sum: int) -> list[int, int]:
    """
    Thanks to
    https://www.codewars.com/kata/reviews/54d8214ccc06a73daa0000b4/groups/54d8b4929e937cd18600030a
    """
    visited = set()

    for right in numbers:
        left = target_sum - right

        if left in visited:
            return [left, right]

        visited.add(right)

# -----------------------------------------------------------------------------

class TestSumPairs(unittest.TestCase):

    big_input_numbers: list[int]

    def setUp(self):
        self.big_input_numbers = [1] * 10_000_000
        self.big_input_numbers[len(self.big_input_numbers) // 2 - 1] = 6
        self.big_input_numbers[len(self.big_input_numbers) // 2] = 7
        self.big_input_numbers[len(self.big_input_numbers) - 2] = 8
        self.big_input_numbers[len(self.big_input_numbers) - 1] = -3
        self.big_input_numbers[0] = 13
        self.big_input_numbers[1] = 3

    def test_basic(self):
        """Basic"""
        result = sum_pairs([1, 4, 8, 7, 3, 15], 8)
        self.assertListEqual(result, [1, 7])

    def test_negatives(self):
        """With negatives"""
        result = sum_pairs([1, -2, 3, 0, -6, 1], -6)
        self.assertListEqual(result, [0, -6])

    def test_no_matches(self):
        """With no matches"""
        result = sum_pairs([20, -13, 40], -7)
        self.assertIsNone(result)

    def test_first_match_left_1(self):
        """With match match from left #1"""
        result = sum_pairs([1, 2, 3, 4, 1, 0], 2)
        self.assertListEqual(result, [1, 1])

    def test_first_match_left_2(self):
        """With match match from left #2"""
        result = sum_pairs([10, 5, 2, 3, 7, 5], 10)
        self.assertListEqual(result, [3, 7])

    def test_duplicates(self):
        """With match match from left #2"""
        result = sum_pairs([4, -2, 3, 3, 4], 8)
        self.assertListEqual(result, [4, 4])

    def test_zeros(self):
        """With zeros"""
        result = sum_pairs([0, 2, 0], 0)
        self.assertListEqual(result, [0, 0])

    def test_subtraction(self):
        """With subtraction"""
        result = sum_pairs([5, 9, 13, -3], 10)
        self.assertListEqual(result, [13, -3])

    def test_ten_million_middle_pair(self):
        """With ten million numbers with a pair in the middle"""
        result = sum_pairs(self.big_input_numbers, 13)
        self.assertListEqual(result, [6, 7])

    def test_ten_million_end_pair(self):
        """With ten million numbers with a pair at the end"""
        result = sum_pairs(self.big_input_numbers, 5)
        self.assertListEqual(result, [8, -3])

    def test_ten_million_start_pair(self):
        """With ten million numbers with a pair at the beginning"""
        result = sum_pairs(self.big_input_numbers, 16)
        self.assertListEqual(result, [13, 3])

    def test_ten_million_no_match(self):
        """With ten million numbers with no matches"""
        result = sum_pairs(self.big_input_numbers, 31)
        self.assertIsNone(result)

if __name__ == '__main__':
    unittest.main(verbosity=1)