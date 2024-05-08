import { IsDefined, IsEnum, IsIn, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import {
  AuthenticityIdentCheckResultTypes,
  eCheckDiagnose,
  eCheckResult,
  eSecurityFeatureType,
  type tAuthenticityIdentCheckResultType,
} from '@regulaforensics/document-reader-typings'
import { plainToInstance, Type } from 'class-transformer'

import { aAuthenticityCheck } from '../authenticity-check.abstract'
import { iRLocation, RLocation } from './children'


/**
* Authenticity image check list item
*/
export interface iRAuthenticityIdentCheck extends aAuthenticityCheck {
  /**
  * Feature type
  * @type {tAuthenticityIdentCheckResultType}
  */
  checkType: tAuthenticityIdentCheckResultType

  /**
  * Area location
  * @type {iRLocation|undefined}
  */
  location?: iRLocation

  /**
  * Identity percent of the etalon and sample image
  * @type {number}
  */
  similarity: number

  /**
  * Element with which errors are checked
  * @type {eSecurityFeatureType}
  */
  type: eSecurityFeatureType;

  /**
  * Located image fragment
  * @type {string}
  */
  image: string

  /**
  * Reference image
  * @type {string}
  */
  referenceImage: string

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
* Authenticity image check list item
*/
export class RAuthenticityIdentCheck extends aAuthenticityCheck implements iRAuthenticityIdentCheck {
  /**
  * Feature type
  * @type {tAuthenticityIdentCheckResultType}
  */
  @IsDefined()
  @IsIn(AuthenticityIdentCheckResultTypes)
  checkType: tAuthenticityIdentCheckResultType

  /**
  * Area location
  * @type {RLocation|undefined}
  */
  @IsOptional()
  @ValidateNested()
  @Type(() => RLocation)
  location?: RLocation

  /**
  * Identity percent of the etalon and sample image
  * @type {number}
  */
  @IsDefined()
  @IsNumber()
  similarity: number

  /**
  * Element with which errors are checked
  * @type {eSecurityFeatureType}
  */
  @IsDefined()
  @IsEnum(eSecurityFeatureType)
  type: eSecurityFeatureType;

  /**
  * Located image fragment
  * @type {string}
  */
  @IsDefined()
  @IsString()
  image: string

  /**
  * Reference image
  * @type {string}
  */
  @IsDefined()
  @IsString()
  referenceImage: string

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
  * @param {iRAuthenticityIdentCheck} input - plain object
  * @returns {RAuthenticityIdentCheck}
  */
  static fromPlain = (input: any): RAuthenticityIdentCheck =>
    plainToInstance(RAuthenticityIdentCheck, input)

  /**
  * Check if the given object is an instance of RAuthenticityIdentCheck
  * @param {unknown} type - object to check
  * @returns {type is RAuthenticityIdentCheck} - result
  */
  static isBelongs = (type: unknown): type is RAuthenticityIdentCheck => {
    const item = type as RAuthenticityIdentCheck

    return AuthenticityIdentCheckResultTypes.includes(item?.checkType)
  }
}
