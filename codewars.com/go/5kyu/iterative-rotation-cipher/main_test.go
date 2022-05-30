package main

import (
	"fmt"
	"testing"
)

type testCase struct {
	order   int
	decoded string
	encoded string
}

var testCases = []testCase{
	{
		10,
		"If you wish to make an apple pie from scratch, you must first invent the universe.",
		"10 hu fmo a,ys vi utie mr snehn rni tvte .ysushou teI fwea pmapi apfrok rei tnocsclet",
	},
	{
		14,
		"True evil is a mundane bureaucracy.",
		"14 daue ilev is a munbune Traurecracy.",
	},
	{
		22,
		"There is nothing more atrociously cruel than an adored child.",
		"22 tareu oo iucnaTr dled oldthser.hg hiarm nhcn se rliyet oincoa",
	},
	{
		36,
		"As I was going up the stair\nI met a man who wasn't there!\nHe wasn't there again today,\nOh how I wish he'd go away!",
		"36 ws h weA dgIaa ug owh n!asrit git \n msm phw teaI'e tanantwhe reos\ns ther! aHeae 'gwadin\nt haw n htoo ,I'i sy aohOy",
	},
	{
		29,
		"I avoid that bleak first hour of the working day during which my still sluggish senses and body make every chore a penance.\nI find that in arriving later, the work which I do perform is of a much higher quality.",
		"29 a r.lht niou gwryd aoshg gIsi mk lei adwhfci isd seensn rdohy mo kleie oltbyhes a\naneu p.n rndr tehh irnne yifav t eo,raclhtc frpw IIti im gwkaidhv aicufh ima doea eruhi y io qshhcoa kr ef l btah gtrrse otnvugrt",
	},
}

func TestEncodeIRC(t *testing.T) {
	for _, c := range testCases {

		order := c.order
		input := c.decoded
		expected := c.encoded
		testName := fmt.Sprintf("Encode(%d, %q)", order, input)

		t.Run(testName, func(t *testing.T) {
			result := Encode(order, input)
			if result != expected {
				t.Errorf("Result: %v Expected: %v", result, expected)
			}
		})
	}
}

func TestDecodeIRC(t *testing.T) {
	for _, c := range testCases {

		input := c.encoded
		expected := c.decoded
		testName := fmt.Sprintf("Decode(%q)", input)

		t.Run(testName, func(t *testing.T) {
			result := Decode(input)
			if result != expected {
				t.Errorf("Result: %v Expected: %v", result, expected)
			}
		})
	}
}
