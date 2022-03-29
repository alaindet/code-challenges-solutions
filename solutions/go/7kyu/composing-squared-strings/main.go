// https://www.codewars.com/kata/56f253dd75e340ff670002ac/train/go
package main

import (
	"fmt"
	"strings"
)

func Compose(s1, s2 string) string {

	s1Lines := strings.Split(s1, "\n")
	s2Lines := strings.Split(s2, "\n")
	n := len(s1Lines)
	composed := make([]string, 0, n)

	for i := 0; i < n; i++ {
		left := s1Lines[i][:i+1]
		right := s2Lines[n-i-1][:n-i]
		line := left + right
		composed = append(composed, line)
	}

	return strings.Join(composed, "\n")
}

type TestCase struct {
	args     [2]string
	expected string
}

func runTests(testCases []TestCase) {
	for _, testCase := range testCases {
		args := testCase.args
		result := Compose(args[0], args[1])
		passed := result == testCase.expected
		fmt.Printf(
			"fn(%q, %q) = %q; expected = %q; passed? %t\n",
			args[0],
			args[1],
			result,
			testCase.expected,
			passed,
		)
	}
}

func main() {
	runTests([]TestCase{
		{
			args: [...]string{
				"byGt\nhTts\nRTFF\nCnnI",
				"jIRl\nViBu\nrWOb\nNkTB",
			},
			expected: "bNkTB\nhTrWO\nRTFVi\nCnnIj",
		},
		{
			args: [...]string{
				"HXxA\nTGBf\nIPhg\nuUMD",
				"Hcbj\nqteH\nGbMJ\ngYPW",
			},
			expected: "HgYPW\nTGGbM\nIPhqt\nuUMDH",
		},
	})
}
