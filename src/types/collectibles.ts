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
  databaseID: string
  name: string
  uniqueName: string
  image: string
  description: string
  masteryRequirement: number
  introduced: string
  wikiURL?: string
  isPrime?: boolean
  isVaulted?: boolean
}

/**
 * Convert a Firestore DocumentData object to a Warframe object
 *
 * @export
 * @param {string} id Database document identifier
 * @param {firebase.firestore.DocumentData} data The data from Firestore
 * @returns {Warframe} Returns a warframe object
 */
export function convertToWarframe(
  id: string,
  data: firebase.firestore.DocumentData
): Warframe {
  return {
    databaseID: id,
    uniqueName: data.uniqueName,
    name: data.name,
    image: data.image,
    description: data.description,
    masteryRequirement: data.masteryRequirement,
    introduced: data.introduced,
    wikiURL: data.wikiURL,
    isPrime: data.isPrime,
    isVaulted: data.isVaulted,
  }
}

/**
 *  Criteria by which Warframes can be sorted
 *
 * @export
 * @enum {number}
 */
export enum WarframeSortCriteria {
  name,
  introduced,
  masteryRequirement,
  prime,
  vaulted,
}

/**
 * Compare function for Array.prototype.sort
 *
 * @export
 * @param {WarframeSortCriteria} field
 * @param {Warframe} warframeA
 * @param {Warframe} warframeB
 * @returns {number}
 */
export function CompareWarframesBy(
  field: WarframeSortCriteria,
  warframeA: Warframe,
  warframeB: Warframe
): number {
  if (field === WarframeSortCriteria.name) {
    if (warframeA.name < warframeB.name) return -1
    else if (warframeA.name > warframeB.name) return 1
    else return 0
  } else if (field === WarframeSortCriteria.introduced) {
    if (warframeA.introduced < warframeB.introduced) return -1
    else if (warframeA.introduced > warframeB.introduced) return 1
    else return 0
  } else if (field === WarframeSortCriteria.masteryRequirement) {
    return warframeA.masteryRequirement - warframeB.masteryRequirement
  } else if (field === WarframeSortCriteria.prime) {
    if (warframeA.isPrime && !warframeB.isPrime) return -1
    else if (!warframeA.isPrime && warframeB.isPrime) return 1
    else return 0
  } else if (field === WarframeSortCriteria.vaulted) {
    if (!warframeA.isVaulted && warframeB.isVaulted) return 1
    else if (warframeA.isVaulted && !warframeB.isVaulted) return -1
    else return 0
  }

  return 0
}
