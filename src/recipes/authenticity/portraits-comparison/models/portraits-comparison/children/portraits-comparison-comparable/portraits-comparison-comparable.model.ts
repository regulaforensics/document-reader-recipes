import { IsDefined, IsEnum, IsNumber, IsString } from 'class-validator'
import { eCheckResult, } from '@regulaforensics/document-reader-typings'

import { ePortraitComparisonSource } from './consts'
import { plainToClass } from 'class-transformer'


/**
* Interface for portraits comparison comparable
*/
export interface iRPortraitComparisonComparable {
  /**
  * Portraits comparison source
  * @type {ePortraitComparisonSource}
  */
  source: ePortraitComparisonSource

  /**
  * Check result
  * @type {eCheckResult}
  */
  checkResult: eCheckResult

  /**
  * Identity percent of the etalon and sample image
  * @type {number}
  */
  similarity: number

  /**
  * Reference image
  * @type {string}
  */
  image: string
}

/**
* Authenticity image check list item
*/
export class RPortraitComparisonComparable implements iRPortraitComparisonComparable {
  /**
  * Portraits comparison source
  * @type {ePortraitComparisonSource}
  */
  @IsDefined()
  @IsEnum(ePortraitComparisonSource)
  source: ePortraitComparisonSource

  /**
  * Check result
  * @type {eCheckResult}
  */
  @IsDefined()
  @IsEnum(eCheckResult)
  checkResult: eCheckResult

  /**
  * Identity percent of the etalon and sample image
  * @type {number}
  */
  @IsDefined()
  @IsNumber()
  similarity: number

  /**
  * Reference image
  * @type {string}
  */
  @IsDefined()
  @IsString()
  image: string

  /**
  * Create instance of RPortraitComparisonComparable from plain object
  * @param {any} input - plain object
  * @returns {RPortraitComparisonComparable}
  */
  static fromPlain = (input: any): RPortraitComparisonComparable => plainToClass(RPortraitComparisonComparable, input)
}
