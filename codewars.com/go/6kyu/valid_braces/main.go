package main

func ValidBraces(input string) bool {

	// String length must be even
	if len(input)%2 != 0 {
		return false
	}

	matchingBraces := map[[2]rune]bool{
		{'(', ')'}: true,
		{'[', ']'}: true,
		{'{', '}'}: true,
	}

	isBrace := func(b rune) bool {
		return b == '(' || b == '[' || b == '{' || b == ')' || b == ']' || b == '}'
	}

	isLeftBrace := func(b rune) bool {
		return b == '(' || b == '[' || b == '{'
	}

	bracesStack := make([]rune, 0, len(input)/2)

	for _, char := range input {

		// Invalid character
		if !isBrace(char) {
			return false
		}

		// Just put the left brace on the stack
		if isLeftBrace(char) {
			bracesStack = append(bracesStack, char)
			continue
		}

		// Too many right braces
		if len(bracesStack) == 0 {
			return false
		}

		// Braces mismatch
		lastBrace := bracesStack[len(bracesStack)-1]
		doBracesMatch := matchingBraces[[2]rune{lastBrace, char}]
		if !doBracesMatch {
			return false
		}

		// Everything's fine, pop a left brace from the stack
		bracesStack = bracesStack[:len(bracesStack)-1]
	}

	// Any left braces...left-overs?
	return len(bracesStack) == 0
}
