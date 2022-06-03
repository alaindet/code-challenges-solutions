package main

import (
	"regexp"
)

var values map[rune]int = map[rune]int{
	'0': 0,
	'1': 1,
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
	'X': 10,
	'x': 10,
}

func ValidISBN10(isbn string) bool {

	matched, _ := regexp.MatchString("^[0-9]{9}[0-9Xx]$", isbn)

	if !matched {
		return false
	}

	s := 0
	for i, digit := range []rune(isbn) {
		s += values[digit] * (i + 1)
	}

	return s%11 == 0
}
