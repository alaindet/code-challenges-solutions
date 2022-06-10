package main

// https://www.codewars.com/kata/reviews/629c43b2d0459e00014ef1eb/groups/629c55dad39aa00001866a3e
func FindAll2(digitsSum, digitsCount int) []int {
	var result [][]int

	for _, digits := range slice(digitsCount, 1) {
		if sum(digits) == digitsSum {
			result = append(result, digits)
		}
	}

	count := len(result)

	if count == 0 {
		return []int{}
	}

	lowest := collect(result[0])
	highest := collect(result[count-1])

	return []int{count, lowest, highest}
}

// Ex.:
// [10 20 30] => 60
func sum(nums []int) int {
	sum := 0
	for _, n := range nums {
		sum += n
	}
	return sum
}

// Ex.:
// [1 1 8] => 118
// [2 3 5] => 235
func collect(digits []int) int {
	result := 0
	for _, d := range digits {
		result = 10*result + d
	}
	return result
}

// Recursion
func slice(digitsCount, start int) [][]int {
	result := make([][]int, 0)

	for i := start; i < 10; i++ {
		if digitsCount == 1 {
			result = append(result, []int{i})
		} else {
			for _, d := range slice(digitsCount-1, i) {
				result = append(result, append([]int{i}, d...))
			}
		}
	}

	return result
}
