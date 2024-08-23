package main

import (
	"strconv"
	"strings"
	"testing"
)

func TestLastDigit(t *testing.T) {
	var testCases = []struct {
		input    []int
		expected int
	}{
		{[]int{}, 1},
		{[]int{0, 0}, 1},
		{[]int{0, 0, 0}, 0},
		{[]int{1, 2}, 1},
		{[]int{2, 3, 3}, 2},
		{[]int{3, 4, 5}, 1},
		{[]int{4, 3, 6}, 4},
		{[]int{7, 6, 21}, 1},
		{[]int{12, 30, 21}, 6},
		{[]int{2, 0, 1}, 1},
		{[]int{2, 2, 2, 0}, 4},
		{[]int{937640, 767456, 981242}, 0},
		{[]int{123232, 694022, 140249}, 6},
		{[]int{499942, 898102, 846073}, 6},
	}

	getTestName := func(nums []int) string {
		b := strings.Builder{}
		for _, n := range nums {
			b.WriteString(strconv.Itoa(n) + ",")
		}
		return strings.TrimRight(b.String(), ",")
	}

	for _, c := range testCases {
		testName := getTestName(c.input)
		t.Run(testName, func(t *testing.T) {
			result := LastDigit(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}

func TestLastDigitOfPower(t *testing.T) {
	var testCases = []struct {
		input    []int
		expected int
	}{
		{[]int{7, 2}, 9},
		{[]int{7, 3}, 3},
		{[]int{7, 4}, 1},
		{[]int{7, 5}, 7},
		{[]int{2, 10}, 4},
		{[]int{10, 3}, 0},
		{[]int{10, 10}, 0},
	}

	getTestName := func(nums []int) string {
		b := strings.Builder{}
		for _, n := range nums {
			b.WriteString(strconv.Itoa(n) + ",")
		}
		return strings.TrimRight(b.String(), ",")
	}

	for _, c := range testCases {
		testName := getTestName(c.input)
		t.Run(testName, func(t *testing.T) {
			result := lastDigitOfPower(c.input[0], c.input[1])
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
