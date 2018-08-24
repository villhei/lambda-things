import * as lambda from '~/lambda'
import { Fun, True, False, Identity } from '~/lambda'

type LabeledFun = [Fun, string]

const T: LabeledFun = [True, 'TRUE']
const F: LabeledFun = [False, 'FALSE']

type BinaryTruthTable = Array<[[LabeledFun, LabeledFun], LabeledFun]>

const extractLabel = ([,label]: LabeledFun) => label

function testTruthTable(table: BinaryTruthTable, fun: Fun) {
  table.forEach(([input, expected]) => {
    const prettyInput = input.map(extractLabel).join(', ')
    const [result, prettyExp] = expected

      it(`should solve truth of ${prettyInput} as ${prettyExp}`, () => {
        const [[left,], [right,]] = input
        expect(fun(left)(right)).toEqual(result)
      })
  })
}

describe('Lambda Booleans', () => {
  const { AND, OR, NOT } = lambda
  describe('AND', () => {
    const permutations: BinaryTruthTable = [
        [[T, T], T],
        [[T, F], F],
        [[F, T], F],
        [[F, F], F],
      ]
    testTruthTable(permutations, AND)
  })

  describe('OR', () => {
    const permutations: BinaryTruthTable = [
        [[T, T], T],
        [[T, F], T],
        [[F, T], T],
        [[F, F], F],
      ]
    testTruthTable(permutations, OR)
  })

  describe('NOT', () => {
    it('should flip TRUE to FALSE', () => {
      expect(NOT(True)).toEqual(False)
    })

    it('should flip FALSE to TRUE', () => {
      expect(NOT(False)).toEqual(True)
    })
  })
})
