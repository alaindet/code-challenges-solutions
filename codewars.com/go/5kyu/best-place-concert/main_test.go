package main

import "testing"

type TestCase struct {
	name     string
	input    []string
	expected []Position
}

func TestBestPlace(t *testing.T) {
	testCases := []TestCase{
		{
			name:     "choose first",
			expected: []Position{{0, 0}, {0, 1}, {0, 2}},
			input: []string{
				"   ",
			},
		},
		{
			name:     "prefer closer to stage",
			expected: []Position{{0, 0}},
			input: []string{
				" ",
				" ",
			},
		},
		{
			name:     "prefer shorter people in front",
			expected: []Position{{1, 1}},
			input: []string{
				"test",
				"    ",
			},
		},
		{
			name:     "avoid beer holders",
			expected: []Position{{0, 3}},
			input: []string{
				" Aa ",
			},
		},
		{
			name:     "beer doesn't spill diagonally",
			expected: []Position{{0, 1}},
			input: []string{
				"  ",
				"A ",
			},
		},
		{
			name:     "avoid moshpits",
			expected: []Position{{4, 1}},
			input: []string{
				"  ",
				"  ",
				"ZZ",
				"ZZ",
				"Z ",
			},
		},
		{
			name:     "moshpits don't link diagonally",
			expected: []Position{{2, 2}},
			input: []string{
				"  a",
				"  a",
				"aa ",
				" aa",
			},
		},
		{
			name:     "multiple moshpits",
			expected: []Position{{1, 6}},
			input: []string{
				"  A  AA",
				"  A  A ",
			},
		},
		{
			name:     "cannot avoid moshpits",
			expected: []Position{{1, 2}},
			input: []string{
				"zzvz",
				"z  z",
				"z  z",
				"zzzz",
			},
		},
		{
			name:     "complex floor",
			expected: []Position{{0, 5}},
			input: []string{
				"gbvKq  JfiM I",
				"q jecl   fvoX",
				"L  Foa   ygKT",
			},
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			row, col := BestPlace(testCase.input)
			exp := testCase.expected

			for _, e := range exp {
				if e.row == row && e.col == col {
					return
				}
			}

			t.Errorf("got {%d, %d} expected one of %v", row, col, exp)
		})
	}
}
