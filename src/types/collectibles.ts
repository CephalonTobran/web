/**
 * An array of warframes.
 *
 * @export
 * @class WarframeList
 * @extends {Array<Warframe>}
 */
export class WarframeList extends Array<Warframe> {}

/**
 * A warframe object.
 *
 * @export
 * @interface Warframe
 */
export interface Warframe {
  uniqueName: string
  name: string
  image: string
  description: string
  masteryRequirement: number
  introduced: string
  wikiURL: string
  isPrime: boolean
  isVaulted: boolean
}
