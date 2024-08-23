package main

// https://www.codewars.com/kata/5526fc09a1bbd946250002dc/train/go
func FindOutlier(nums []int) int {
	parity := getMeanParity(nums)

	for _, n := range nums {
		if parity != getParity(n) {
			return n
		}
	}

	return 0
}

func getMeanParity(nums []int) int {
	a := getParity(nums[0])
	b := getParity(nums[1])
	c := getParity(nums[2])

	if a == b {
		return a
	}

	if a == c {
		return a
	}

	return b
}

func getParity(n int) int {
	parity := n % 2
	if parity == -1 {
		return 1
	}
	return parity
}
