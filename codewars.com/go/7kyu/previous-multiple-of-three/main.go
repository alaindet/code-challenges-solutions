// https://www.codewars.com/kata/61123a6f2446320021db987d/train/go
package main

import (
	"fmt"
	"strconv"
	"unicode/utf8"
)

func PrevMultOfThree(n int) interface{} {

	if n == 0 {
		return nil
	}

	if n%3 == 0 {
		return n
	}

	str := strconv.Itoa(n)
	strLen := utf8.RuneCountInString(str)
	smallerN, err := strconv.Atoi(str[:strLen-1])
	_ = err
	return PrevMultOfThree(smallerN)
}

func runTest(arg int, expected interface{}) {
	result := PrevMultOfThree(arg)
	passed := result == expected
	fmt.Printf(
		"fn(%v) = %v; expected = %v; passed? %v\n",
		arg,
		result,
		expected,
		passed,
	)
}

func main() {
	runTest(1, nil)
	runTest(25, nil)
	runTest(36, 36)
	runTest(1244, 12)
	runTest(952406, 9)
}
