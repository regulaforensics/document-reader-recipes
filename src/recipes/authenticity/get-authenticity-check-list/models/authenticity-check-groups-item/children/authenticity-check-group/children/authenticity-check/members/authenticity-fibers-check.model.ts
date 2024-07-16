import { IsDefined, IsEnum, IsIn, IsInt, IsOptional, ValidateNested } from 'class-validator'
import {
  AuthenticityFibersTypeCheckResultTypes,
  eCheckDiagnose,
  eCheckResult,
  type tAuthenticityFibersTypeCheckResultType,
} from '@regulaforensics/document-reader-typings'
import { plainToInstance, Type } from 'class-transformer'

import { Default } from '@/decorators'
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

  /**
  * Fibers’ color (B, G, R)
  * @type {number[]}
  */
  colorValues: number[]

  /**
  * Number of RectArray, Width, Length, Area items
  * @type {number}
  */
  rectCount: number

  /**
  * Expected fibers number
  * @type {number}
  */
  expectedCount: number
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
  * Fibers’ color (B, G, R)
  * @type {number[]}
  */
  @IsDefined()
  @Default([0,0,0])
  @IsInt({ each: true })
  colorValues: number[]

  /**
  * Number of RectArray, Width, Length, Area items
  * @type {number}
  */
  @IsDefined()
  @Default(0)
  @IsInt()
  rectCount: number

  /**
  * Expected fibers number
  * @type {number}
  */
  @IsDefined()
  @Default(0)
  @IsInt()
  expectedCount: number

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
