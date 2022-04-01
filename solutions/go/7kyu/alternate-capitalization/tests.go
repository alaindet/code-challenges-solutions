package main

import (
	"fmt"
	"reflect"
)

type TestCase struct {
	args     string
	expected []string
}

var testCases = []TestCase{
	{
		args:     "abcdef",
		expected: []string{"AbCdEf", "aBcDeF"},
	},
	{
		args:     "codewars",
		expected: []string{"CoDeWaRs", "cOdEwArS"},
	},
	{
		args:     "abracadabra",
		expected: []string{"AbRaCaDaBrA", "aBrAcAdAbRa"},
	},
	{
		args:     "codewarriors",
		expected: []string{"CoDeWaRrIoRs", "cOdEwArRiOrS"},
	},
	{
		args:     "indexinglessons",
		expected: []string{"InDeXiNgLeSsOnS", "iNdExInGlEsSoNs"},
	},
	{
		args:     "codingisafunactivity",
		expected: []string{"CoDiNgIsAfUnAcTiViTy", "cOdInGiSaFuNaCtIvItY"},
	},
}

func runTests() {
	for _, testCase := range testCases {
		result := Capitalize(testCase.args)
		passed := reflect.DeepEqual(result, testCase.expected)
		fmt.Printf(
			"fn(%v) = %v; expected = %v; passed? %t\n",
			testCase.args,
			result,
			testCase.expected,
			passed,
		)
	}
}
