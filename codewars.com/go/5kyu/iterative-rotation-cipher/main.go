package main

import "fmt"

/*
Encode(10, "If you wish to make an apple pie from scratch, you must first invent the universe.")

Step 1 — remove all spaces:
`Ifyouwishtomakeanapplepiefromscratch,youmustfirstinventtheuniverse.`

Step 2 — shift the order of string characters to the right by 10:
`euniverse.Ifyouwishtomakeanapplepiefromscratch,youmustfirstinventth`

Step 3 — place the spaces back in their original positions:
`eu niv erse .I fyou wi shtom ake anap plepiefr oms crat ch,yo umustf irs tinventth`

Step 4 — shift the order of characters for each space-separated substring to the right by 10:
`eu vni seer .I oufy wi shtom eak apan frplepie som atcr ch,yo ustfum sir htinventt`

Step 5 - Repeat the steps 9 more times before returning the string with `10 ` prepended.
*/

// https://www.codewars.com/kata/5a3357ae8058425bde002674/train/go
func Encode(n int, s string) string {
	return ""
}

func Decode(s string) string {
	return ""
}

func main() {
	fmt.Println(
		Encode(10, "If you wish to make an apple pie from scratch, you must first invent the universe."),
	)
}
