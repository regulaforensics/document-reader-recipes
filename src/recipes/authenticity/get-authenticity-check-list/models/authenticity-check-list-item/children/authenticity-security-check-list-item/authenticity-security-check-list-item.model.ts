import { IsDefined, IsEnum, IsIn } from 'class-validator'
import { plainToClass } from 'class-transformer'

import type { tAuthenticitySecurityFeatureCheckResultType } from '@regulaforensics/document-reader-typings'
import {
  AuthenticitySecurityFeatureCheckResultTypes,
  eCheckDiagnose,
  eCheckResult,
  eSecurityFeatureType,
} from '@regulaforensics/document-reader-typings'


/**
* Authenticity Barcode check list item
*/
export interface iRAuthenticitySecurityCheckListItem {
  /**
  * Feature type
  * @type {tAuthenticitySecurityFeatureCheckResultType}
  */
  securityFeatureType: tAuthenticitySecurityFeatureCheckResultType

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
export class RAuthenticitySecurityCheckListItem implements iRAuthenticitySecurityCheckListItem {
  /**
  * Feature type
  * @type {tAuthenticitySecurityFeatureCheckResultType}
  */
  @IsDefined()
  @IsIn(AuthenticitySecurityFeatureCheckResultTypes)
  securityFeatureType: tAuthenticitySecurityFeatureCheckResultType

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
  * @param {iRAuthenticitySecurityCheckListItem} input - plain object
  * @returns {RAuthenticitySecurityCheckListItem}
  */
  static fromPlain = (input: iRAuthenticitySecurityCheckListItem): RAuthenticitySecurityCheckListItem =>
    plainToClass(RAuthenticitySecurityCheckListItem, input)
}
