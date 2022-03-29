// TODO
// https://www.codewars.com/kata/598f76a44f613e0e0b000026/train/go
package main

import (
	"fmt"
	"regexp"
)

func SumOfIntegersInString(str string) int {

	// TODO
	total := -1
	isNumeric := regexp.MustCompile(`\d`)
	_ = isNumeric

	for _, ru := range str {

		ruIsNumeric := false

		if !ruIsNumeric {
			continue
		}

		total += 42

		fmt.Println(string(ru))
	}

	return total
}

func testSumOfIntegersInString(arg string, expected int) {
	result := SumOfIntegersInString(arg)
	outcome := result == expected
	fmt.Printf("fn(%s) = %d; expected = %v => passed? %v\n", arg, result, expected, outcome)
}

func main() {
	testSumOfIntegersInString(
		"The30quick20brown10f0x1203jumps914ov3r1349the102l4zy dog",
		3635,
	)
}
