package main

import (
	"fmt"
	"reflect"
)

type TestCase struct {
	args     []int
	expected [][]int
}

var testCases = []TestCase{
	{
		args: []int{2, 2},
		expected: [][]int{
			[]int{1, 1},
			[]int{1, 2},
			[]int{1, 3},
			[]int{2, 1},
			[]int{2, 3},
			[]int{3, 1},
			[]int{3, 2},
			[]int{3, 3},
		},
	},
}

func runTests() {
	for _, testCase := range testCases {
		result := CartesianNeighbor(
			testCase.args[0],
			testCase.args[1],
		)

		passed := reflect.DeepEqual(result, testCase.expected)
		fmt.Printf(
			"fn(%d, %d) = %v; expected = %v; passed? %t\n",
			testCase.args[0],
			testCase.args[1],
			result,
			testCase.expected,
			passed,
		)
	}
}
