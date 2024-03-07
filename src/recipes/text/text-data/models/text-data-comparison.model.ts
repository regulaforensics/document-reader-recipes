import { eCheckResult, eSource } from '@regulaforensics/document-reader-typings'
import { Expose } from 'class-transformer'
import { IsDefined, IsEnum } from 'class-validator'


/**
* Used for comparison of text results
*/
export interface iRTextDataComparison {
  /**
  * Source left
  * @type {eSource}
  */
  sourceLeft: eSource

  /**
  * Source right
  * @type {eSource}
  */
  sourceRight: eSource

  /**
  * Comparison status
  * @type {eCheckResult}
  */
  status: eCheckResult
}

/**
* Used for comparison of text results
*/
export class RTextDataComparison implements iRTextDataComparison {
  /**
  * Source left
  * @type {eSource}
  */
  @Expose()
  @IsDefined()
  @IsEnum(eSource)
  sourceLeft: eSource

  /**
  * Source right
  * @type {eSource}
  */
  @Expose()
  @IsDefined()
  @IsEnum(eSource)
  sourceRight: eSource

  /**
  * Comparison status
  * @type {eCheckResult}
  */
  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  status: eCheckResult
}
