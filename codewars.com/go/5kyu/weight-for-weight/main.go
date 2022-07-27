package main

import (
	"sort"
	"strconv"
	"strings"
)

// https://www.codewars.com/kata/55c6126177c9441a570000cc/train/go
func OrderWeight(input string) string {

	if input == "" {
		return ""
	}

	if strings.Count(input, " ") == 0 {
		return input
	}

	weights := strings.Split(input, " ")

	sort.Slice(weights, func(i, j int) bool {
		a, b := weights[i], weights[j]
		aSum, bSum := SumDigits(a), SumDigits(b)
		if aSum != bSum {
			return aSum < bSum
		}
		return a < b
	})

	return strings.Join(weights, " ")
}

func SumDigits(n string) int {
	result := 0
	for _, d := range n {
		val, _ := strconv.Atoi(string(d))
		result += val
	}
	return result
}
