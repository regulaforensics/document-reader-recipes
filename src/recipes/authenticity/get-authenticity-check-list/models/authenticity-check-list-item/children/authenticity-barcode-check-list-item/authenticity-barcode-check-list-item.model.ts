import { IsDefined, IsEnum } from 'class-validator'

import { eCheckDiagnose, eCheckResult, eSecurityFeatureType } from '@regulaforensics/document-reader-typings'
import { plainToClass } from 'class-transformer'


/**
* Authenticity Barcode check list item
*/
export interface iRAuthenticityBarcodeCheckListItem {
  /**
  * Feature type
  * @type {string}
  */
  feature: eSecurityFeatureType

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
* Authenticity Barcode check list item
*/
export class RAuthenticityBarcodeCheckListItem implements iRAuthenticityBarcodeCheckListItem {
  /**
  * Feature type
  * @type {string}
  */
  @IsDefined()
  @IsEnum(eSecurityFeatureType)
  feature: eSecurityFeatureType

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
  * Create instance of RAuthenticityBarcodeCheckListItem from plain object
  * @param {iRAuthenticityBarcodeCheckListItem} input - plain object
  * @returns {RAuthenticityBarcodeCheckListItem}
  */
  static fromPlain = (input: iRAuthenticityBarcodeCheckListItem): RAuthenticityBarcodeCheckListItem =>
    plainToClass(RAuthenticityBarcodeCheckListItem, input)
}
