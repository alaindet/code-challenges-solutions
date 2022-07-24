package main

import (
	"strings"
)

// https://www.codewars.com/kata/52223df9e8f98c7aa7000062/train/go
func Rot13(input string) string {

	var b strings.Builder
	lowerDiff := 'z' - 'a'
	upperDiff := 'Z' - 'A'

	for _, c := range input {

		sub := c + 13

		if c >= 'a' && c <= 'z' {
			if sub > 'z' {
				sub -= lowerDiff + 1
			}
			b.WriteRune(sub)
			continue
		}

		if c >= 'A' && c <= 'Z' {
			if sub > 'Z' {
				sub -= upperDiff + 1
			}
			b.WriteRune(sub)
			continue
		}

		b.WriteRune(c)
	}

	return b.String()
}
