import { IsDefined, IsEnum, IsString } from 'class-validator'

import { eCheckDiagnose, eCheckResult } from '@regulaforensics/document-reader-typings'
import { plainToClass } from 'class-transformer'


/**
* Authenticity IPI check list item
*/
export interface iRAuthenticityIpiCheckListItem {
  /**
  * Located image fragment
  * @type {string}
  */
  image: string

  /**
  * Element with which errors are checked
  * @type {eCheckDiagnose}
  */
  diagnose: eCheckDiagnose

  /**
  * Overall checking result
  * @type {eCheckResult}
  */
  checkResult: eCheckResult
}

/**
* Authenticity IPI check list item
*/
export class RAuthenticityIpiCheckListItem implements iRAuthenticityIpiCheckListItem {
  /**
  * Located image fragment
  * @type {string}
  */
  @IsDefined()
  @IsString()
  image: string

  /**
  * Element with which errors are checked
  * @type {eCheckDiagnose}
  */
  @IsDefined()
  @IsEnum(eCheckDiagnose)
  diagnose: eCheckDiagnose

  /**
  * Overall checking result
  * @type {eCheckResult}
  */
  @IsDefined()
  @IsEnum(eCheckResult)
  checkResult: eCheckResult

  /**
  * Create instance of RAuthenticityIpiCheckListItem from plain object
  * @param {iRAuthenticityIpiCheckListItem} input - plain object
  * @returns {RAuthenticityIpiCheckListItem}
  */
  static fromPlain = (input: iRAuthenticityIpiCheckListItem): RAuthenticityIpiCheckListItem =>
    plainToClass(RAuthenticityIpiCheckListItem, input)
}
