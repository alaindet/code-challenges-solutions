// https://www.codewars.com/kata/526dad7f8c0eb5c4640000a4/train/typescript
// nodemon -x npx ts-node ./vector-class.ts -w ./vector-class.ts

const sum = (nums: number[]) => nums.reduce((total, n) => total += n, 0);

type VectorsIterator = (a: number, b: number, i: number) => number;

export class Vector {

  private array: number[] = [];

  constructor(array?: number[]) {
    if (array) {
      this.array = array;
    }
  }

  private iterateWith(b: Vector, fn: VectorsIterator): number[] {
    const aData = this.getData();
    const bData = b.getData();

    if (aData.length !== bData.length) {
      throw new Error('the two vectors have different lengths');
    }

    const result: number[] = [];

    for (let i = 0, len = aData.length; i < len; i++) {
      result[i] = fn(aData[i], bData[i], i);
    }

    return result;
  }

  getData(): number[] {
    return [...this.array];
  }

  equals(v: Vector): boolean {
    try {
      this.iterateWith(v, (a, b) => {
        if (a !== b) throw new Error('not equal');
        return -1;
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  add(v: Vector): Vector {
    return new Vector(this.iterateWith(v, (a, b) => a + b));
  }

  subtract(v: Vector): Vector{
    return new Vector(this.iterateWith(v, (a, b) => a - b));
  }

  dot(v: Vector): number {
    return sum(this.iterateWith(v, (a, b) => a * b));
  }

  norm(): number {
    return Math.sqrt(sum(this.array.map(x => x * x)));
  }

  toString(): string {
    return `(${this.array.join(',')})`;
  }
}

// Testing --------------------------------------------------------------------
const testCases: {
  name: string;
  act: () => boolean;
}[] = [
  {
    name: 'equals',
    act: () => {
      const a = new Vector([1,2]);
      const b = new Vector([3,4]);
      return !a.equals(b);
    },
  },
  {
    name: 'add',
    act: () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([3, 4, 5]);
      const expected = new Vector([4, 6, 8]);
      return a.add(b).equals(expected);
    },
  },
  {
    name: 'norm',
    act: () => {
      const a = new Vector([1,2,3])
      const result = a.norm();
      const expected = Math.sqrt(14);
      return approximately(result, expected, 0.1);
    },
  },
  {
    name: 'subtract',
    act: () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([3, 4, 5]);
      const expected = new Vector([-2, -2, -2]);
      const result = a.subtract(b);
      return result.equals(expected);
    },
  },
  {
    name: 'dot',
    act: () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([3, 4, 5]);
      const result = a.dot(b);
      const expected = 26;
      return result === expected;
    },
  },
  {
    name: 'toString',
    act: () => {
      const a = new Vector([1, 2, 3]);
      const result = a.toString();
      const expected = '(1,2,3)';
      return result === expected;
    },
  },
];

const success = testCases.every(({ name, act }) => {
  if (!act()) {
    console.error(`ERROR: ${name}`);
    return false;
  }
  return true;
});

console.log(success ? 'tests passed' : 'tests failed');

function approximately(a: number, b: number, epsilon: number) {
  let delta = a - b;
  if (delta < 0) delta *= -1;
  return delta <= epsilon;
}
