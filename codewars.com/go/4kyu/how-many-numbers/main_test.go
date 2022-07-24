package main

import (
	"fmt"
	"reflect"
	"testing"
)

type testCase struct {
	input    []int
	expected []int
}

func TestFindReverseNumber(t *testing.T) {

	testCases := []testCase{
		{[]int{10, 3}, []int{8, 118, 334}},
		{[]int{27, 3}, []int{1, 999, 999}},
		{[]int{84, 4}, []int{}},
		{[]int{35, 6}, []int{123, 116999, 566666}},
	}

	for _, c := range testCases {
		testName := fmt.Sprintf("FindAll(%d,%d)=%v", c.input[0], c.input[1], c.expected)
		t.Run(testName, func(t *testing.T) {
			result := FindAll(c.input[0], c.input[1])
			if !reflect.DeepEqual(result, c.expected) {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
