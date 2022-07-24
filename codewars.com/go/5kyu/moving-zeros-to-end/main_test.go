package main

import (
	"reflect"
	"strconv"
	"strings"
	"testing"
)

type testCase struct {
	input    []int
	expected []int
}

var testCases = []testCase{
	{
		[]int{1, 2, 3, 0, 0, 0},
		[]int{1, 2, 3, 0, 0, 0},
	},
	{
		[]int{0, 2},
		[]int{2, 0},
	},
	{
		[]int{1, 2, 0, 1, 0, 1, 0, 3, 0, 1},
		[]int{1, 2, 1, 1, 3, 1, 0, 0, 0, 0},
	},
	{
		[]int{1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 8, 0, 9},
		[]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0},
	},
}

func TestMoveZeros(t *testing.T) {
	for _, c := range testCases {
		t.Run(buildTestName(c), func(t *testing.T) {
			result := MoveZeros(c.input)
			if !reflect.DeepEqual(result, c.expected) {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}

func buildTestName(t testCase) string {
	b := strings.Builder{}
	last := len(t.input) - 1

	for i, n := range t.input {
		b.WriteString(strconv.Itoa(n))
		if i != last {
			b.WriteString(",")
		}
	}

	return b.String()
}
