package main

import (
	"regexp"
	"strings"
)

// https://www.codewars.com/kata/526dbd6c8c0eb53254000110/train/go
func alphanumeric(input string) bool {
	result := strings.TrimSpace(input)
	matches, _ := regexp.MatchString("^[a-zA-Z0-9]+$", result)
	return matches
}
