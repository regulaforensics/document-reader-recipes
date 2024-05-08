import { IsDefined, IsEnum, IsIn, ValidateNested } from 'class-validator'
import { plainToInstance, Type } from 'class-transformer'

import {
  AuthenticityOCRSecurityTextCheckResultTypes,
  eCheckDiagnose,
  eCheckResult,
  eVisualFieldType,
  type tAuthenticityOCRSecurityTextCheckResultType,
} from '@regulaforensics/document-reader-typings'
import { aAuthenticityCheck } from '../authenticity-check.abstract'
import { iRLocation, RLocation } from './children'


/**
* Authenticity text check result type
*/
export interface iRAuthenticityTextCheck extends aAuthenticityCheck {
  /**
  * Feature type
  * @type {tAuthenticityOCRSecurityTextCheckResultType}
  */
  checkType: tAuthenticityOCRSecurityTextCheckResultType

  /**
  * Area location
  * @type {iRLocation}
  */
  location: iRLocation

  /**
  * Overall checking result
  * @type {eCheckResult}
  */
  checkResult: eCheckResult

  /**
  * Element with which errors are checked
  * @type {eVisualFieldType}
  */
  type: eVisualFieldType;

  /**
  * Element with which errors are checked
  * @type {eCheckDiagnose}
  */
  diagnose: eCheckDiagnose
}

/**
* Authenticity text check result type
*/
export class RAuthenticityTextCheck extends aAuthenticityCheck implements iRAuthenticityTextCheck {
  /**
  * Feature type
  * @type {tAuthenticityOCRSecurityTextCheckResultType}
  */
  @IsDefined()
  @IsIn(AuthenticityOCRSecurityTextCheckResultTypes)
  checkType: tAuthenticityOCRSecurityTextCheckResultType

  /**
  * Area location
  * @type {RLocation}
  */
  @IsDefined()
  @ValidateNested()
  @Type(() => RLocation)
  location: RLocation

  /**
  * Overall checking result
  * @type {eCheckResult}
  */
  @IsDefined()
  @IsEnum(eCheckResult)
  checkResult: eCheckResult

  /**
  * Element with which errors are checked
  * @type {eVisualFieldType}
  */
  @IsDefined()
  @IsEnum(eVisualFieldType)
  type: eVisualFieldType

  /**
  * Element with which errors are checked
  * @type {eCheckDiagnose}
  */
  @IsDefined()
  @IsEnum(eCheckDiagnose)
  diagnose: eCheckDiagnose

  /**
  * Create instance of RAuthenticityTextCheck from plain object
  * @param {iRAuthenticityTextCheck} input - plain object
  * @returns {RAuthenticityTextCheck}
  */
  static fromPlain = (input: any): RAuthenticityTextCheck =>
    plainToInstance(RAuthenticityTextCheck, input)

  /**
  * Check if the given object is an instance of RAuthenticityTextCheck
  * @param {unknown} type - object to check
  * @returns {type is RAuthenticityTextCheck} - result
  */
  static isBelongs = (type: unknown): type is RAuthenticityTextCheck => {
    const item = type as RAuthenticityTextCheck

    return AuthenticityOCRSecurityTextCheckResultTypes.includes(item?.checkType)
  }
}
