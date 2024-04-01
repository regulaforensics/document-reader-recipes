import { IsDefined, IsEnum, IsString, ValidateNested } from 'class-validator'
import { plainToInstance, Type } from 'class-transformer'

import { ePortraitComparisonSource, iRPortraitComparisonComparable, RPortraitComparisonComparable } from './children'


/**
* Portraits comparison item
*/
export interface iRPortraitsComparison {
  /**
  * Reference image
  * @type {string}
  */
  image: string

  /**
  * Portraits comparison source
  * @type {ePortraitComparisonSource}
  */
  source: ePortraitComparisonSource

  /**
  * Comparison elements
  * @type {iRPortraitComparisonComparable[]}
  */
  comparable: iRPortraitComparisonComparable[]
}

/**
* Portraits comparison item
*/
export class RPortraitsComparison implements iRPortraitsComparison {
  /**
  * Reference image
  * @type {string}
  */
  @IsDefined()
  @IsString()
  image: string

  /**
  * Portraits comparison source
  * @type {ePortraitComparisonSource}
  */
  @IsDefined()
  @IsEnum(ePortraitComparisonSource)
  source: ePortraitComparisonSource

  /**
  * Comparison elements
  * @type {iRPortraitComparisonComparable[]}
  */
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => RPortraitComparisonComparable)
  comparable: RPortraitComparisonComparable[]

  /**
  * Create instance of RPortraitsComparison from plain object
  * @param {iRPortraitsComparison} input - plain object
  * @returns {RPortraitsComparison}
  */
  static fromPlain = (input: any): RPortraitsComparison =>
    plainToInstance(RPortraitsComparison, input)
}
