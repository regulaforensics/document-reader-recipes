import { IsDefined, IsEnum, IsIn, IsOptional, ValidateNested } from 'class-validator'
import {
  AuthenticityFibersTypeCheckResultTypes,
  eCheckDiagnose,
  eCheckResult,
  type tAuthenticityFibersTypeCheckResultType,
} from '@regulaforensics/document-reader-typings'
import { plainToInstance, Type } from 'class-transformer'

import { aAuthenticityCheck } from '../authenticity-check.abstract'
import { iRLocation, RLocation } from './children'


export interface iRAuthenticityFibersCheck extends aAuthenticityCheck {
  /**
  * Feature type
  * @type {tAuthenticityFibersTypeCheckResultType}
  */
  checkType: tAuthenticityFibersTypeCheckResultType

  /**
  * Area location
  * @type {iRLocation|undefined}
  */
  location?: iRLocation

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

export class RAuthenticityFibersCheck extends aAuthenticityCheck implements iRAuthenticityFibersCheck {
  /**
  * Feature type
  * @type {tAuthenticityFibersTypeCheckResultType}
  */
  @IsDefined()
  @IsIn(AuthenticityFibersTypeCheckResultTypes)
  checkType: tAuthenticityFibersTypeCheckResultType

  /**
  * Area location
  * @type {RLocation|undefined}
  */
  @IsOptional()
  @ValidateNested()
  @Type(() => RLocation)
  location?: RLocation

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
  * Create instance of RAuthenticityImageCheckListItem from plain object
  * @param {iRAuthenticityFibersCheck} input - plain object
  * @returns {RAuthenticityFibersCheck}
  */
  static fromPlain = (input: any): RAuthenticityFibersCheck =>
    plainToInstance(RAuthenticityFibersCheck, input)

  /**
  * Check if the given object is an instance of RAuthenticityIdentCheck
  * @param {unknown} type - object to check
  * @returns {type is RAuthenticityFibersCheck} - result
  */
  static isBelongs = (type: unknown): type is RAuthenticityFibersCheck => {
    const item = type as RAuthenticityFibersCheck

    return AuthenticityFibersTypeCheckResultTypes.includes(item?.checkType)
  }
}
