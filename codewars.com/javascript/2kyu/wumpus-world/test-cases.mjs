import { CaveRoom } from './wumpus-world.mjs'
/** @import { Cave } from './wumpus-world.mjs' */

/**
 * @typedef {object} Test
 * @property {string} name
 * @property {Cave} input
 * @property {boolean} expected
 */

export const TEST_CASES = [
  // {
  //   name: '#01',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Wumpus, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Gold],
  //     [CaveRoom.Pit, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //   ],
  // },
  // {
  //   name: '#02',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Wumpus, CaveRoom.Empty, CaveRoom.Gold],
  //   ],
  // },
  // {
  //   name: '#03',
  //   expected: false,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Wumpus, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Gold],
  //   ],
  // },
  // {
  //   name: '#04',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Gold, CaveRoom.Pit],
  //     [CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Wumpus, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //   ],
  // },
  {
    name: '#05',
    expected: true,
    input: [
      [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Wumpus, CaveRoom.Empty],
      [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
      [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit],
      [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Gold],
    ],
  },
  // {
  //   name: '#06',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Wumpus, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Pit],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Gold],
  //   ],
  // },
  // {
  //   name: '#07',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Wumpus, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Pit, CaveRoom.Pit],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Gold],
  //   ],
  // },
  // {
  //   name: '#08',
  //   expected: false,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Gold],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit],
  //     [CaveRoom.Wumpus, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //   ],
  // },
  // {
  //   name: '#09',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Wumpus, CaveRoom.Gold],
  //   ],
  // },
  // {
  //   name: '#10',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Wumpus],
  //     [CaveRoom.Pit, CaveRoom.Gold, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //   ],
  // },
  // {
  //   name: '#11',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Wumpus, CaveRoom.Pit, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Gold, CaveRoom.Empty, CaveRoom.Empty],
  //   ],
  // },
  // {
  //   name: '#12',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Gold],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Wumpus, CaveRoom.Pit],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //   ],
  // },
  // {
  //   name: '#13',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Wumpus],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Gold, CaveRoom.Empty],
  //     [CaveRoom.Pit, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //   ],
  // },
  // {
  //   name: '#14',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Wumpus, CaveRoom.Pit],
  //     [CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Gold, CaveRoom.Empty, CaveRoom.Empty],
  //   ],
  // },
  // {
  //   name: '#15',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Wumpus, CaveRoom.Pit],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Empty],
  //     [CaveRoom.Pit, CaveRoom.Empty, CaveRoom.Gold, CaveRoom.Empty],
  //   ],
  // },
  // {
  //   name: '#16',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Gold],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Wumpus],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Pit],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //   ],
  // },
  // {
  //   name: '#17',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Gold, CaveRoom.Empty],
  //     [CaveRoom.Pit, CaveRoom.Pit, CaveRoom.Empty, CaveRoom.Wumpus],
  //   ],
  // },
  // {
  //   name: '#18',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Empty, CaveRoom.Pit],
  //     [CaveRoom.Empty, CaveRoom.Gold, CaveRoom.Wumpus, CaveRoom.Pit],
  //   ],
  // },
  // {
  //   name: '#19',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Pit],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Empty, CaveRoom.Pit],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Gold, CaveRoom.Wumpus],
  //   ],
  // },
  // {
  //   name: '#20',
  //   expected: true,
  //   input: [
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Wumpus, CaveRoom.Pit],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty],
  //     [CaveRoom.Empty, CaveRoom.Pit, CaveRoom.Empty, CaveRoom.Pit],
  //     [CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Empty, CaveRoom.Gold],
  //   ],
  // },
];