import { IsDefined, IsEnum, IsIn, IsOptional, ValidateNested } from 'class-validator'
import { plainToInstance, Type } from 'class-transformer'
import type { tAuthenticitySecurityFeatureCheckResultType } from '@regulaforensics/document-reader-typings'
import {
  AuthenticitySecurityFeatureCheckResultTypes,
  eCheckDiagnose,
  eCheckResult,
  eSecurityFeatureType,
} from '@regulaforensics/document-reader-typings'

import { aAuthenticityCheck } from '../authenticity-check.abstract'
import { iRLocation, RLocation } from './children'


/**
* Authenticity Barcode check list item
*/
export interface iRAuthenticitySecurityCheck extends aAuthenticityCheck {
  /**
  * Feature type
  * @type {tAuthenticitySecurityFeatureCheckResultType}
  */
  checkType: tAuthenticitySecurityFeatureCheckResultType

  /**
  * Area location
  * @type {iRLocation|undefined}
  */
  location?: iRLocation

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
export class RAuthenticitySecurityCheck extends aAuthenticityCheck implements iRAuthenticitySecurityCheck {
  /**
  * Feature type
  * @type {tAuthenticitySecurityFeatureCheckResultType}
  */
  @IsDefined()
  @IsIn(AuthenticitySecurityFeatureCheckResultTypes)
  checkType: tAuthenticitySecurityFeatureCheckResultType

  /**
  * Area location
  * @type {RLocation|undefined}
  */
  @IsOptional()
  @ValidateNested()
  @Type(() => RLocation)
  location?: RLocation

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
  * @param {any} input - plain object
  * @returns {RAuthenticitySecurityCheck}
  */
  static fromPlain = (input: any): RAuthenticitySecurityCheck =>
    plainToInstance(RAuthenticitySecurityCheck, input)

  /**
  * Check if the given object is an instance of RAuthenticitySecurityCheck
  * @param {unknown} type - object to check
  * @returns {type is RAuthenticitySecurityCheck} - result
  */
  static isBelongs = (type: unknown): type is RAuthenticitySecurityCheck => {
    const item = type as RAuthenticitySecurityCheck

    return AuthenticitySecurityFeatureCheckResultTypes.includes(item?.checkType)
  }
}
