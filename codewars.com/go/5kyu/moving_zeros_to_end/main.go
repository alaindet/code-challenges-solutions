package main

func MoveZeros(arr []int) []int {
	result := make([]int, 0, len(arr))
	zeros := 0

	for _, n := range arr {
		if n == 0 {
			zeros++
		} else {
			result = append(result, n)
		}
	}

	for i := 0; i < zeros; i++ {
		result = append(result, 0)
	}

	return result
}
