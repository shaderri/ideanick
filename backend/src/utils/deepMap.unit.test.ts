import _ from 'lodash'
import { deepMap } from './deepMap'
describe('deepMap', () => {
  it('should map object', () => {
    const fn = () => {
      return 1
    }
    const fn1 = () => {
      return 2
    }
    fn1.fn2 = fn1
    const input = {
      object: {
        a: 1,
        x: null,
        z: undefined,
        o: fn,
        p: fn1,
        b: '22',
        c: [3, 4],
        c1: [3, 4],
        d: [{ e: 5 }, { f: 6 }],
        g: [
          [7, 8],
          [{ x: 0 }, 10],
        ],
        s: {
          t: 11,
          u: 12,
        },
        s1: { t: 11, u: 12 },
      },
      objectRecursive: null as any,
    }
    input.objectRecursive = input

    const output = deepMap(input, ({ key, path, value }) => {
      if (path === 'object.c1.0') {
        return 'my path is object.c1.0'
      }
      if (key === 'u') {
        return 'my key is u'
      }
      if (key === 's1') {
        return 'me was an object'
      }
      if (_.isString(value) || _.isNumber(value)) {
        return `${value} + 'XXX'`
      }
      return value
    })
    expect(output).toMatchInlineSnapshot(`
{
  "object": {
    "a": "1 + 'XXX'",
    "b": "22 + 'XXX'",
    "c": [
      "3 + 'XXX'",
      "4 + 'XXX'",
    ],
    "c1": [
      "my path is object.c1.0",
      "4 + 'XXX'",
    ],
    "d": [
      {
        "e": "5 + 'XXX'",
      },
      {
        "f": "6 + 'XXX'",
      },
    ],
    "g": [
      [
        "7 + 'XXX'",
        "8 + 'XXX'",
      ],
      [
        {
          "x": "0 + 'XXX'",
        },
        "10 + 'XXX'",
      ],
    ],
    "o": {},
    "p": {
      "fn2": "CIRCULAR!!!",
    },
    "s": {
      "t": "11 + 'XXX'",
      "u": "my key is u",
    },
    "s1": "me was an object",
    "x": null,
    "z": undefined,
  },
  "objectRecursive": "CIRCULAR!!!",
}
`)
  })
})
