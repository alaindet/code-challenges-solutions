package main

import (
	"strconv"
	"testing"
)

type TestCaseInput struct {
	str string
	n   int
}

func TestRevrot(t *testing.T) {
	var testCases = []struct {
		input    TestCaseInput
		expected string
	}{
		{TestCaseInput{"123456987654", 6}, "234561876549"},
		{TestCaseInput{"123456987653", 6}, "234561356789"},
		{TestCaseInput{"66443875", 4}, "44668753"},
		{TestCaseInput{"66443875", 8}, "64438756"},
		{TestCaseInput{"664438769", 8}, "67834466"},
		{TestCaseInput{"123456779", 8}, "23456771"},
		{TestCaseInput{"", 8}, ""},
		{TestCaseInput{"123456779", 0}, ""},
		{TestCaseInput{"563000655734469485", 4}, "0365065073456944"},
	}

	for _, c := range testCases {
		name := "str_" + c.input.str + "_num_" + strconv.Itoa(c.input.n)
		t.Run(name, func(t *testing.T) {
			result := Revrot(c.input.str, c.input.n)
			assertStrings(t, result, c.expected)
		})
	}
}

func TestReverse(t *testing.T) {

	var testCases = []struct {
		input    string
		expected string
	}{
		{"1234", "4321"},
		{"abCDef", "feDCba"},
	}

	for _, c := range testCases {
		t.Run(c.input, func(t *testing.T) {
			assertStrings(t, reverse(c.input), c.expected)
		})
	}
}

func TestRotateLeft(t *testing.T) {

	var testCases = []struct {
		input    string
		expected string
	}{
		{"1234", "2341"},
		{"abCDef", "bCDefa"},
	}

	for _, c := range testCases {
		t.Run(c.input, func(t *testing.T) {
			assertStrings(t, rotateLeft(c.input), c.expected)
		})
	}
}

func TestRotateRight(t *testing.T) {

	var testCases = []struct {
		input    string
		expected string
	}{
		{"1234", "4123"},
		{"abCDef", "fabCDe"},
	}

	for _, c := range testCases {
		t.Run(c.input, func(t *testing.T) {
			assertStrings(t, rotateRight(c.input), c.expected)
		})
	}
}

func TestIsSumOfCubedDigitsEven(t *testing.T) {

	var testCases = []struct {
		input    string
		expected bool
	}{
		{"1234", true},
		{"23456", true},
		{"4242", true},
		{"111", false},
		{"999", false},
	}

	for _, c := range testCases {
		t.Run(c.input, func(t *testing.T) {
			assertBooleans(t, isSumOfCubedDigitsEven(c.input), c.expected)
		})
	}
}

func assertStrings(t *testing.T, result, expected string) {
	if result != expected {
		t.Errorf("Result: %v Expected: %v", result, expected)
	}
}

func assertBooleans(t *testing.T, result, expected bool) {
	if result != expected {
		t.Errorf("Result: %v Expected: %v", result, expected)
	}
}
