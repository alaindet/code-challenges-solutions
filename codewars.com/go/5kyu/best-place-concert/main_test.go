package main

import "testing"

type TestCase struct {
	name     string
	input    []string
	expected Position
}

func NewTestCase(name string, expected Position, input []string) TestCase {
	return TestCase{
		name:     name,
		input:    input,
		expected: expected,
	}
}

func TestBestPlace(t *testing.T) {
	testCases := []TestCase{
		NewTestCase("choose first", Position{0, 0}, []string{
			"   ",
		}),
		NewTestCase("prefer closer to stage", Position{0, 0}, []string{
			" ",
			" ",
		}),
		NewTestCase("prefer shorter people in front", Position{1, 1}, []string{
			"test",
			"    ",
		}),
		NewTestCase("avoid beer holders", Position{0, 0}, []string{
			" Aa ",
		}),
		NewTestCase("beer no spilled diagonally", Position{0, 1}, []string{
			"  ",
			"A ",
		}),
		NewTestCase("avoid moshpits", Position{0, 1}, []string{
			"  ",
			"  ",
			"ZZ",
			"ZZ",
			"Z ",
		}),
		NewTestCase("moshpits don't link diagonally", Position{2, 2}, []string{
			"  a",
			"  a",
			"aa ",
			" aa",
		}),
		NewTestCase("multiple moshpits", Position{1, 6}, []string{
			"  A  AA",
			"  A  A ",
		}),
		NewTestCase("cannot avoid moshpits", Position{1, 2}, []string{
			"zzvz",
			"z  z",
			"z  z",
			"zzzz",
		}),
		NewTestCase("complex floor", Position{1, 1}, []string{
			"gbvKq  JfiM I",
			"q jecl   fvoX",
			"L  Foa   ygKT",
		}),
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			exp := testCase.expected
			y, x := BestPlace(testCase.input)

			if exp[0] != y || exp[1] != x {
				t.Errorf("got {%d, %d} expected {%d, %d}", y, x, exp[0], exp[1])
			}
		})
	}
}
