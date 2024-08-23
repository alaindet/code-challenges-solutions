package main

import (
	"strconv"
)

// WARNING: This works but it's not efficient
// https://www.codewars.com/kata/600c18ec9f033b0008d55eec/train/go
func FindReverseNumber(n uint64) uint64 {
	var counter uint64
	var result uint64
	var i uint64

	for counter < n {
		if isReverse(i) {
			counter++
			result = i
		}
		i++
	}

	return result
}

func isReverse(n uint64) bool {

	digits := []byte(strconv.FormatUint(n, 10))

	digitsCount := len(digits)
	half := digitsCount / 2

	if digitsCount%2 == 1 {
		half -= 1
	}

	for i := 0; i <= half; i++ {
		if digits[i] != digits[digitsCount-i-1] {
			return false
		}
	}

	return true
}
