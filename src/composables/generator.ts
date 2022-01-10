const operation_pool: { [key: string]: Operation } = {
  '+': {
    calc: (a: number, b: number) => a + b,
    predicate: (a: number, b: number) => true,
    operand_num: 2
  },
  '-': {
    calc: (a: number, b: number) => a - b,
    predicate: (a: number, b: number) => true,
    operand_num: 2
  },
  '*': {
    calc: (a: number, b: number) => a * b,
    predicate: (a: number, b: number) => true,
    operand_num: 2
  },
  '/': {
    calc: (a: number, b: number) => a / b,
    predicate: (a: number, b: number) => b !== 0,
    operand_num: 2
  },
  gcd: {
    calc: (a: number, b: number) => gcd(a, b),
    predicate: (a: number, b: number) =>
      Number.isInteger(a) && Number.isInteger(b),
    operand_num: 2
  },
  power: {
    calc: (a: number, b: number) => Math.pow(a, b),
    predicate: (a: number, b: number) => true,
    operand_num: 2
  },
  '//': {
    calc: (a: number, b: number) => Math.floor(a / b),
    predicate: (a: number, b: number) =>
      b !== 0 && Number.isInteger(a) && Number.isInteger(b),
    operand_num: 2
  },
  mod: {
    calc: (a: number, b: number) => a % b,
    predicate: (a: number, b: number) =>
      b !== 0 && Number.isInteger(a) && Number.isInteger(b),
    operand_num: 2
  },
  comb: {
    calc: (a: number, b: number) => combinations(a, b),
    predicate: (a: number, b: number) =>
      Number.isInteger(a) && Number.isInteger(b) && a >= b && b >= 0,
    operand_num: 2
  },
  xor: {
    calc: (a: number, b: number) => a ^ b,
    predicate: (a: number, b: number) =>
      Number.isInteger(a) && Number.isInteger(b),
    operand_num: 2
  },
  '!': {
    calc: (a: number) => product_range(1, a),
    predicate: (a: number) => Number.isInteger(a) && a >= 0,
    operand_num: 1
  },
  'a^2': {
    calc: (a: number) => a * a,
    predicate: (a: number) => true,
    operand_num: 1
  }
}

interface Operation {
  calc: (...args: Array<number>) => number
  predicate: (...args: Array<number>) => boolean
  operand_num: number
}

const gcd = (a: number, b: number): number => {
  if (!b) return a
  return gcd(b, a % b)
}

function product_range(a: number, b: number) {
  let prd = a
  let i = a
  while (i++ < b) prd *= i
  return prd
}

function combinations(n: number, r: number) {
  if (n == r) {
    return 1
  } else {
    r = r < n - r ? n - r : r
    return Math.floor(product_range(r + 1, n) / product_range(1, n - r))
  }
}

const get_random_int = (max: number) => Math.floor(Math.random() * max)

const shuffle = (array: Array<any>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = get_random_int(i + 1)
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

const poker_deck = (() => {
  const values = Array.from({ length: 13 }, (_, i) => i + 1)
  const deck = values.concat(values).concat(values).concat(values)
  return deck
})()

export const generate_problem = (
  card_number = 4,
  operation_number = 4,
  target_number = 24
) => {
  while (true) {
    const all_operations = Object.keys(operation_pool)
    shuffle(all_operations)
    shuffle(poker_deck)
    const operations = all_operations.slice(0, card_number)
    const cards = poker_deck.slice(0, operation_number)
    const { is_exist, solution } = check_solution_exists(
      operations,
      cards,
      target_number
    )
    if (is_exist) {
      return { operations, cards, solution }
    }
  }
}

export const check_solution_exists = (
  operations: Array<string>,
  cards: Array<number>,
  target_number = 24
) => {
  let cur: Array<string> = []
  const MAX_VALUE = 5000
  const MAX_DEPTH = 5
  const checker = (cur_cards: Array<number>, depth = 0) => {
    // console.log(cur)
    if (cur_cards.length === 1) {
      return Math.abs(cur_cards[0] - target_number) < Number.EPSILON
    }
    if (depth > MAX_DEPTH) return false
    shuffle(operations)
    for (const op of operations) {
      if (operation_pool[op].operand_num === 1) {
        for (let i = 0; i < cur_cards.length; i++) {
          const remaining = cur_cards.filter((_, index) => i !== index)
          const x = cur_cards[i]
          if (operation_pool[op].predicate(x)) {
            const result = operation_pool[op].calc(x)
            if (result > MAX_VALUE || result === x) continue
            cur.push(`${op} ${x} = ${result}`)
            if (checker(remaining.concat([result]), depth + 1)) return true
            cur.pop()
          }
        }
      } else if (operation_pool[op].operand_num === 2) {
        for (let i = 0; i < cur_cards.length; i++) {
          for (let j = i + 1; j < cur_cards.length; j++) {
            const remaining = cur_cards.filter(
              (_, index) => i !== index && j !== index
            )
            for (const [x, y] of [
              [cur_cards[i], cur_cards[j]],
              [cur_cards[j], cur_cards[i]]
            ]) {
              if (operation_pool[op].predicate(x, y)) {
                const result = operation_pool[op].calc(x, y)
                if (result > MAX_VALUE) continue
                cur.push(`${x} ${op} ${y} = ${result}`)
                if (checker(remaining.concat([result]), depth + 1)) return true
                cur.pop()
              }
            }
          }
        }
      }
    }
    return false
  }
  return { is_exist: checker(cards), solution: cur }
}
