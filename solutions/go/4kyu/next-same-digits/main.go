package main

import (
	"strconv"
)

func NextBigger(n int) int {

	digits := strconv.Itoa(n)
	found := false
	nextBigger := -1

	Perm([]rune(digits), func(a []rune) {
		val, _ := strconv.Atoi(string(a))

		if val <= n {
			return
		}

		if !found {
			found = true
			nextBigger = val
			return
		}

		if val < nextBigger {
			nextBigger = val
		}
	})

	if !found {
		return -1
	}

	return nextBigger
}

// Thanks to the amazing yourbasic.org/golang
// https://yourbasic.org/golang/generate-permutation-slice-string/
func Perm(source []rune, fn func([]rune)) {
	perm(source, fn, 0)
}

// Thanks to the amazing yourbasic.org/golang
// https://yourbasic.org/golang/generate-permutation-slice-string/
// Permute the values at index i to len(a)-1.
func perm(source []rune, fn func([]rune), i int) {
	if i > len(source) {
		fn(source)
		return
	}

	perm(source, fn, i+1)

	for j := i + 1; j < len(source); j++ {
		source[i], source[j] = source[j], source[i]
		perm(source, fn, i+1)
		source[i], source[j] = source[j], source[i]
	}
}
