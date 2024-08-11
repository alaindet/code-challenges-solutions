# https://www.codewars.com/kata/57ba58d68dcd97e98c00012b

def is_prime(n: int) -> bool:
    if n < 2:
        return False

    for divider in range(2, n):
        if n % divider == 0:
            return False

    return True

def prime_primes(n: int) -> tuple[int, int]:
    primes: list[int] = [i for i in range(2, n) if is_prime(i)]

    count: int = 0
    sum: int = 0

    for denominator in primes:
        for numerator in primes:

            if (numerator >= denominator):
                break
        
            ratio: float = numerator / denominator
            count += 1
            sum += ratio

    return (count, int(sum))


# -----------------------------------------------------------------------------

testCases: list[tuple[int, tuple[int, int]]] = [
    (6, (3, 1)),
    (4, (1, 0)),
]

for testCase in testCases:
    given, expected = testCase
    result = prime_primes(given)
    outcome = result == expected
    print('PASSED' if outcome else 'NOT PASSED')