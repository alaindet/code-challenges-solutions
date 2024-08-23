package main

import (
	"fmt"
	"strings"
)

type timeUnitMetadata struct {
	name          string
	pluralName    string
	secondsInUnit int64
}

type timeUnit struct {
	value int64
	label string
}

// https://www.codewars.com/kata/52742f58faf5485cae000b9a/train/go
func FormatDuration(seconds int64) string {
	return readableJoin(
		mapSlice(
			splitByTimeUnits(seconds),
			func(u timeUnit) string {
				return fmt.Sprintf("%d %s", u.value, u.label)
			},
		),
	)
}

func mapSlice[T any, K any](slice []T, mapper func(T) K) []K {
	result := make([]K, 0, len(slice))
	for _, item := range slice {
		result = append(result, mapper(item))
	}
	return result
}

func splitByTimeUnits(seconds int64) []timeUnit {
	temp := seconds
	units := getTimeUnitsMetadata()
	result := make([]timeUnit, 0, len(units))

	for _, u := range units {
		value := temp / u.secondsInUnit // Floor

		if value == 0 {
			continue
		}

		label := u.name
		if value > 1 {
			label = u.pluralName
		}

		result = append(result, timeUnit{value, label})
		temp = temp % u.secondsInUnit
	}

	return result
}

func getTimeUnitsMetadata() []timeUnitMetadata {
	return []timeUnitMetadata{
		{"year", "years", 365 * 24 * 60 * 60},
		{"day", "days", 24 * 60 * 60},
		{"hour", "hours", 60 * 60},
		{"minute", "minutes", 60},
		{"second", "seconds", 1},
	}
}

func readableJoin(list []string) string {
	b := strings.Builder{}
	last := len(list) - 1
	secondToLast := last - 1

	for i, item := range list {
		b.WriteString(item)

		separator := ", "
		if i == secondToLast {
			separator = " and "
		} else if i == last {
			separator = ""
		}

		b.WriteString(separator)
	}

	return b.String()
}
