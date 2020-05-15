import { compareStrings, compareNumbers } from "@/utilities"

/**
 * An array of collectibles.
 *
 * @export
 * @type CollectiblesList
 * @extends {Array<Collectible>}
 */
export type CollectiblesList = Array<Collectible>

/**
 * An individual collectible
 *
 * @export
 * @interface Collectible
 */
export interface Collectible {
  databaseID: string
  name: string
  uniqueName: string
  image: string
  description: string
  masteryRequirement: number
  introduced: number
  wikiURL: string
  isVaulted: boolean
}

/**
 * Convert a Firestore DocumentData object to a Collectible object
 *
 * @export
 * @param {string} id Database document identifier
 * @param {firebase.firestore.DocumentData} data The data from Firestore
 * @returns {Collectible} Returns a Collectible object
 */
export function convertToCollectible(
  id: string,
  data: firebase.firestore.DocumentData
): Collectible {
  return {
    databaseID: id,
    uniqueName: data.uniqueName,
    name: data.name,
    image: data.image,
    description: data.description,
    masteryRequirement: data.masteryRequirement,
    introduced: data.introduced,
    wikiURL: data.wikiURL,
    isVaulted: data.isVaulted,
  }
}

/**
 *  Criteria by which Collectibles can be sorted
 *
 * @export
 * @enum {number}
 */
export enum CollectibleSortFields {
  name,
  introduced,
  masteryRequirement,
}

/**
 * Compare function for Array.prototype.sort()
 *
 * @export
 * @param {CollectibleSortFields} field
 * @param {boolean} ascending
 * @param {Collectible} collectibleA
 * @param {Collectible} collectibleB
 * @returns {number}
 */
export function sortCollectiblesBy(
  field: CollectibleSortFields,
  ascending: boolean,
  collectibleA: Collectible,
  collectibleB: Collectible
): number {
  let sortResult: number

  switch (field) {
    case CollectibleSortFields.name:
      sortResult = compareStrings(
        collectibleA.name,
        collectibleB.name,
        ascending
      )
      break

    case CollectibleSortFields.introduced:
      sortResult = compareNumbers(
        collectibleA.introduced,
        collectibleB.introduced,
        ascending
      )
      if (sortResult === 0)
        sortResult = compareStrings(collectibleA.name, collectibleB.name)
      break

    case CollectibleSortFields.masteryRequirement:
      sortResult = compareNumbers(
        collectibleA.masteryRequirement,
        collectibleB.masteryRequirement,
        ascending
      )
      if (sortResult === 0)
        sortResult = compareStrings(collectibleA.name, collectibleB.name)
      break

    default:
      sortResult = 0
      break
  }

  return sortResult
}
