import { IsDefined, IsEnum, IsString } from 'class-validator'
import { eCheckResult, eSource } from '@regulaforensics/document-reader-typings'

import { Default } from '@/decorators'


/**
* Source, value and check result of a text data field
*/
export interface iRTextDataSource {
  /**
  * Source of the text data field
  * @type {eSource}
  */
  source: eSource

  /**
  * Check result of the text data field
  * @type {eCheckResult}
  */
  checkResult: eCheckResult

  /**
  * Value of the text data field
  * @type {string}
  */
  value: string

  /**
  * Field recognition probability
  * @type {number}
  */
  probability: number;

  /**
  * Page index
  * @type {number}
  */
  pageIndex: number;
}

/**
* Source, value and check result of a text data field
*/
export class RTextDataSource implements iRTextDataSource {
  /**
  * Source of the text data field
  * @type {eSource}
  */
  @IsDefined()
  @IsEnum(eSource)
  source: eSource

  /**
  * Check result of the text data field
  * @type {eCheckResult}
  */
  @IsDefined()
  @IsEnum(eCheckResult)
  checkResult: eCheckResult

  /**
  * Value of the text data field
  * @type {string}
  */
  @IsDefined()
  @IsString()
  @Default('')
  value: string

  /**
  * Field recognition probability
  * @type {number}
  */
  @IsDefined()
  @Default(0)
  probability: number;

  /**
  * Page index
  * @type {number}
  */
  @IsDefined()
  @Default(0)
  pageIndex: number;
}
