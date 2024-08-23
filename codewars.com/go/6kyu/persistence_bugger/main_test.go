package main

import (
	"fmt"
	"reflect"
	"strconv"
	"strings"
	"testing"
)

func TestGetDigits(t *testing.T) {
	var testCases = []struct {
		input    int
		expected []int
	}{
		{123, []int{1, 2, 3}},
		{321, []int{3, 2, 1}},
		{33445566, []int{3, 3, 4, 4, 5, 5, 6, 6}},
		{6782163821, []int{6, 7, 8, 2, 1, 6, 3, 8, 2, 1}},
		{5, []int{5}},
		{1020, []int{1, 0, 2, 0}},
	}

	for _, c := range testCases {

		nums := make([]string, 0, len(c.expected))
		for _, n := range c.expected {
			nums = append(nums, strconv.Itoa(n))
		}

		testName := fmt.Sprintf("Input %d Expected %s", c.input, strings.Join(nums, ","))

		t.Run(testName, func(t *testing.T) {
			result := GetDigits(c.input)
			if !reflect.DeepEqual(result, c.expected) {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}

func TestPersistence(t *testing.T) {
	var testCases = []struct {
		input    int
		expected int
	}{
		{39, 3},
		{4, 0},
		{25, 2},
		{999, 4},
	}

	for _, c := range testCases {
		testName := fmt.Sprintf("Input %d Expected %d", c.input, c.expected)
		t.Run(testName, func(t *testing.T) {
			result := Persistence(c.input)
			if result != c.expected {
				t.Errorf("Result: %v Expected: %v", result, c.expected)
			}
		})
	}
}
