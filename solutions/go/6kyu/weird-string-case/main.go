package main

import (
	"fmt"
	"strings"
)

func toWeirdCase(str string) string {
	builder := strings.Builder{}

	for _, word := range strings.Split(str, " ") {
		for i, letter := range word {
			if i%2 == 0 {
				builder.WriteString(strings.ToUpper(string(letter)))
			} else {
				builder.WriteString(strings.ToLower(string(letter)))
			}
		}
		builder.WriteString(" ")
	}

	return strings.TrimRight(builder.String(), " ")
}

// https://www.codewars.com/kata/52b757663a95b11b3d00062d/train/go
func main() {
	fmt.Println(toWeirdCase("String"))            // "StRiNg"
	fmt.Println(toWeirdCase("Weird string case")) // "WeIrD StRiNg CaSe"
}
