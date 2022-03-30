// https://www.codewars.com/kata/59cfc000aeb2844d16000075/train/go
package main

import (
	"strings"
	"unicode"
)

func Capitalize(str string) []string {

	evenBuilder := strings.Builder{}
	oddBuilder := strings.Builder{}

	for i, letter := range str {
		if i%2 == 0 {
			evenBuilder.WriteRune(unicode.ToUpper(letter))
			oddBuilder.WriteRune(unicode.ToLower(letter))
		} else {
			evenBuilder.WriteRune(unicode.ToLower(letter))
			oddBuilder.WriteRune(unicode.ToUpper(letter))
		}
	}

	return []string{
		evenBuilder.String(),
		oddBuilder.String(),
	}
}
