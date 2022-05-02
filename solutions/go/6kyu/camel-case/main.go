package main

import (
	"strings"
	"unicode"
)

/*
// Alternative solution

import "strings"

func CamelCase(s string) string {
  return strings.Replace(strings.Title(s)," ","",-1)
}
*/

// https://www.codewars.com/kata/587731fda577b3d1b0001196/go
func CamelCase(input string) string {

	if input == "" {
		return ""
	}

	words := strings.Split(input, " ")
	segments := make([]string, 0, len(words))

	for _, word := range words {
		if word == "" {
			continue
		}
		segments = append(segments, firstUpper(word))
	}

	return strings.Join(segments, "")
}

func firstUpper(s string) string {
	chars := []rune(s)
	first := unicode.ToUpper(chars[0])
	if len(chars) == 1 {
		return string(first)
	}
	return string(first) + string(chars[1:])
}
