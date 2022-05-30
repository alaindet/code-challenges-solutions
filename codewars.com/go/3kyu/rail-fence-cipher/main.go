package main

import "strings"

/*
 * https://www.codewars.com/kata/58c5577d61aefcf3ff000081/go
 */

func Encode(input string, n int) string {
	if input == "" {
		return input
	}

	letters := []rune(input)
	count := len(letters)
	encoded := make([]rune, 0, count)
	lastIndex := -1
	maxD := 2 * (n - 1)

	// Top rail is highest value
	for rail := n; rail > 0; rail-- {

		// The track forms "pits", rails cut these pits
		// This is the distance between letters on the same pit and the same rail
		d := 2 * (rail - 1)

		// Read whole rail
		i := n - rail
		for {

			if i >= count {
				break
			}

			// Left side of pit
			if i != lastIndex {
				encoded = append(encoded, letters[i])
				lastIndex = i
			}

			if (i + d) >= count {
				break
			}

			// Right side of pit
			if (i + d) != lastIndex {
				encoded = append(encoded, letters[i+d])
				lastIndex = i + d
			}

			i += maxD
		}
	}

	return string(encoded)
}

func Decode(input string, n int) string {
	if input == "" {
		return input
	}

	letters := []rune(input)
	count := len(letters)
	maxD := 2 * (n - 1)
	lastIndex := -1
	mappedIndices := make(map[int]int, count)

	m := 0
	for rail := n; rail > 0; rail-- {
		d := 2 * (rail - 1)
		i := n - rail
		for {
			if i >= count {
				break
			}
			if i != lastIndex {
				mappedIndices[i] = m
				m++
				lastIndex = i
			}
			if (i + d) >= count {
				break
			}
			if (i + d) != lastIndex {
				mappedIndices[i+d] = m
				m++
				lastIndex = i + d
			}
			i += maxD
		}
	}

	var b strings.Builder
	for i := 0; i < count; i++ {
		mappedIndex := mappedIndices[i]
		b.WriteRune(letters[mappedIndex])
	}

	return b.String()
}
