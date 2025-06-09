// https://www.codewars.com/kata/58298e19c983caf4ba000c8d/typescript
// node --watch a-man-and-his-umbrellas.ts # Requires Node v24+

// Test code
(function main() {
  const testCases: Array<{ input: string[]; expected: number }> = [
    {
      input: ['cloudy'],
      expected: 0,
    },
    {
      input: ['rainy', 'rainy', 'rainy', 'rainy'],
      expected: 1,
    },
    {
      input: ['overcast', 'rainy', 'clear', 'thunderstorms'],
      expected: 2,
    },
    {
      input: ['cloudy', 'rainy', 'rainy', 'rainy', 'cloudy', 'cloudy', 'sunny', 'cloudy', 'rainy', 'rainy'],
      expected: 1,
    },
    {
      input: ['sunny', 'windy', 'windy', 'windy', 'thunderstorms', 'sunny', 'clear', 'cloudy', 'clear', 'clear', 'clear', 'sunny', 'windy', 'windy', 'sunny', 'clear', 'sunny', 'sunny', 'clear', 'thunderstorms', 'rainy', 'sunny', 'thunderstorms', 'clear', 'windy', 'sunny', 'thunderstorms', 'clear', 'sunny', 'sunny', 'windy', 'rainy', 'clear', 'clear', 'clear', 'thunderstorms', 'clear', 'clear', 'sunny', 'cloudy', 'sunny', 'sunny', 'clear', 'clear', 'sunny', 'cloudy', 'sunny', 'sunny', 'windy', 'sunny', 'sunny', 'clear', 'windy', 'sunny', 'cloudy', 'windy', 'windy', 'clear', 'sunny', 'clear', 'windy', 'sunny', 'clear', 'windy', 'rainy', 'windy', 'cloudy', 'sunny', 'thunderstorms', 'clear', 'clear', 'sunny', 'sunny', 'clear', 'windy', 'windy', 'thunderstorms', 'windy', 'sunny', 'sunny', 'clear', 'windy', 'windy', 'clear', 'windy', 'clear', 'clear', 'sunny', 'windy', 'rainy', 'clear', 'clear', 'cloudy', 'clear', 'windy', 'rainy', 'windy', 'windy', 'thunderstorms', 'clear'],
      expected: 4,
    },
  ];

  let testsCount = 0;
  let errorsCount = 0;
  console.log('');

  for (const { input, expected } of testCases) {
    testsCount++;
    const forecastsList = input.length > 4
      ? input.slice(0, 4).join(',') + `, +${input.length-4} others`
      : input.join(',')
    const name = `minUmbrellas([${forecastsList}])`;
    const result = minUmbrellas(input);
    const outcome = result === expected;
    let outcomeMessage = 'SUCCESS';
    if (!outcome) {
      errorsCount++;
      outcomeMessage = `ERROR: Expected ${expected} but got ${result}`;
    }
    console.log(`${name}: ${outcomeMessage}`);
  }

  if (errorsCount > 0) {
    console.log(`ERROR: ${errorsCount} out of ${testsCount} tests failed\n`);
  } else {
    console.log('SUCCESS: All tests passed\n');
  }
})();

export function minUmbrellas(forecasts: string[]): number {

  const wetForecasts = new Set(['rainy', 'thunderstorms']);
  let goingToOffice = true;
  let hasUmbrella = false;
  let homeUmbrellas = 0;
  let officeUmbrellas = 0;

  for (const forecast of forecasts) {
    if (!wetForecasts.has(forecast)) {
      hasUmbrella = false;
      goingToOffice = !goingToOffice;
      continue;
    }

    if (hasUmbrella) {
      goingToOffice = !goingToOffice;
      continue;  
    }

    hasUmbrella = true;
    if (goingToOffice) {
      homeUmbrellas++;
    } else {
      officeUmbrellas++;
    }

    goingToOffice = !goingToOffice;
  }

  return homeUmbrellas + officeUmbrellas;
}