/**
 * Calculate the percentage of two numbers
 *
 * @export
 * @param {number} number
 * @param {number} total
 * @returns
 */
export function percentage(number: number, total: number) {
  if (total < 1 || typeof total !== "number") return 0
  if (number < 0 || typeof number !== "number") number = 0
  return Math.floor((number / total) * 100)
}

/**
 * Compare two strings for Array.prototype.sort()
 *
 * @export
 * @param {string} stringA
 * @param {string} stringB
 * @param {boolean} [sortAscending=true]
 * @returns {number}
 */
export function compareStrings(stringA: string, stringB: string, sortAscending = true): number {
  if (stringA < stringB) return sortAscending ? -1 : 1
  else if (stringA > stringB) return sortAscending ? 1 : -1
  else return 0
}

/**
 * Compare two numbers for Array.prototype.sort()
 *
 * @export
 * @param {number} number1
 * @param {number} number2
 * @param {boolean} [sortAscending=true]
 * @returns {number}
 */
export function compareNumbers(number1: number, number2: number, sortAscending = true): number {
  return sortAscending ? number1 - number2 : number2 - number1
}
