// https://www.codewars.com/kata/5a3fe3dde1ce0e8ed6000097/train/go
package main

import (
	"fmt"
	"math"
)

func century(year int) int {
	if year%100 == 0 {
		return int(year / 100)
	}

	return int(math.Ceil(float64(year) / 100))
}

func main() {
	tests := [][2]int{
		{1990, 20},
		{1705, 18},
		{1900, 19},
		{1601, 17},
		{2000, 20},
		{89, 1},
	}

	for _, test := range tests {
		arg := test[0]
		expected := test[1]
		result := century(arg)
		outcome := result == expected
		fmt.Printf("century(%d) = %d expected %v => %v\n", arg, result, expected, outcome)
	}
}
