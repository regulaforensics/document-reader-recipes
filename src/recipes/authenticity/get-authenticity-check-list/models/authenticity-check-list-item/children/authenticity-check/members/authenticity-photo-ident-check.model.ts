import { IsDefined, IsEnum, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator'
import { plainToInstance, Type } from 'class-transformer'
import {
  AuthenticityPhotoIdentCheckResultTypes,
  eCheckDiagnose,
  eCheckResult,
  type tAuthenticityPhotoIdentCheckResultType
} from '@regulaforensics/document-reader-typings'

import { aAuthenticityCheck } from '../authenticity-check.abstract'
import { iRLocation, RLocation } from './children'


/**
* Authenticity IPI check list item
*/
export interface iRAuthenticityPhotoIdentCheck extends aAuthenticityCheck {
  /**
  * Feature type
  * @type {tAuthenticityPhotoIdentCheckResultType}
  */
  checkType: tAuthenticityPhotoIdentCheckResultType

  /**
  * Area location
  * @type {iRLocation|undefined}
  */
  location?: iRLocation

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
export class RAuthenticityPhotoIdentCheck extends aAuthenticityCheck implements iRAuthenticityPhotoIdentCheck {
  /**
  * Feature type
  * @type {tAuthenticityPhotoIdentCheckResultType}
  */
  @IsDefined()
  @IsIn(AuthenticityPhotoIdentCheckResultTypes)
  checkType: tAuthenticityPhotoIdentCheckResultType

  /**
  * Area location
  * @type {RLocation|undefined}
  */
  @IsOptional()
  @ValidateNested()
  @Type(() => RLocation)
  location?: RLocation

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
  * @param {any} input - plain object
  * @returns {RAuthenticityPhotoIdentCheck}
  */
  static fromPlain = (input: any): RAuthenticityPhotoIdentCheck =>
    plainToInstance(RAuthenticityPhotoIdentCheck, input)

  /**
  * Check if the given object is an instance of RAuthenticityIpiCheckListItem
  * @param {unknown} type - object to check
  * @returns {type is RAuthenticityPhotoIdentCheck} - result
  */
  static isBelongs = (type: unknown): type is RAuthenticityPhotoIdentCheck => {
    const item = type as RAuthenticityPhotoIdentCheck

    return AuthenticityPhotoIdentCheckResultTypes.includes(item?.checkType)
  }
}
