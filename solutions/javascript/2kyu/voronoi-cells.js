// https://www.codewars.com/kata/58bf8041aa4014a09e000013/train/javascript
// https://en.wikipedia.org/wiki/Voronoi_diagram

// Aux
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  constructor (m, q) {
    this.m = m;
    this.q = q;
  }
}

const pointMiddle = (a, b) => new Point(
  a.x + (a.x - b.x) / 2,
  a.y + (a.y - b.y) / 2
);

const pointCrossing = (a, b) => {
  const x = (b.q - a.q) / (a.m - b.m);
  return new Line(x, a.m * x + a.q);
};

const lineBetweenPoints = (a, b) => new Line(
  1 / (b.x - a.x),
  a.y / b.y - a.y - a.x / (b.x - a.x)
);

const linePerpendicularTo = (line) => -1 / line.m;
const lineThroughPoint = (m, p) => new Line(m, p.y - m * p.x);

const middleBisectLine = (a, b) => {
  const line = lineBetweenPoints(a, b);
  const perpendicularCoeff = linePerpendicularTo(line);
  const midpoint = pointMiddle(a, b);
  const bisect = lineThroughPoint(perpendicularCoeff, midpoint);
  return bisect;
};


const voronoi_areas = (points) => {
  return false;
};

// TESTS ----------------------------------------------------------------------

const FUNC = voronoi_areas;

const tests = [

  // Test #1
  {
    given: [
      new Point(0.0, 0.0),
      new Point(2.0, 0.0),
      new Point(-2.0, 0.0),
      new Point(0.0, 2.0),
      new Point(0.0, -2.0),
    ],
    expected: [4.0, -1, -1, -1, -1],
  },

  // Test #2
  {
    given: [
      new Point(2.0, 1.0),
      new Point(2.0, -1.0),
      new Point(4.4, 2.2),
      new Point(4.4, -2.2),
      new Point(-0.4, 2.2),
      new Point(-0.4, -2.2),
    ],
    expected: [8, 8, -1, -1, -1, -1],
  }

];

for (const test of tests) {
  const outcome = voronoi_areas(test.given) === test.expected;
  if (outcome) {
    console.log('PASSED');
  } else {
    console.log('FAILED');
  }
}
