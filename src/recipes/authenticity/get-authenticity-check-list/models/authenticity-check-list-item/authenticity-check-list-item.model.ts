import { plainToClass, Transform } from 'class-transformer'
import { IsArray, IsDefined, IsEnum, IsInt, ValidateNested, validateSync, ValidationError } from 'class-validator'
import { eCheckResult } from '@regulaforensics/document-reader-typings'

import { AllowPrimitives } from '@/types'
import { Default } from '@/decorators'
import { iuRAuthenticityCheck, uRAuthenticityCheck } from './children'


/**
* Authenticity check list item
*/
export interface iRAuthenticityCheckListItem {
  /**
  * Page
  * @type {number}
  */
  page: number

  /**
  * Check result
  * @type {eCheckResult}
  */
  checkResult: eCheckResult

  /**
  * Check list
  * @type {iuRAuthenticityCheck[]}
  */
  checks: iuRAuthenticityCheck[]
}

/**
* Authenticity check list item
*/
export class RAuthenticityCheckListItem implements iRAuthenticityCheckListItem {
  /**
  * Page
  * @type {number}
  */
  @IsDefined()
  @IsInt()
  page: number

  /**
  * Check result
  * @type {eCheckResult}
  */
  @IsDefined()
  @IsEnum(eCheckResult)
  checkResult: eCheckResult

  /**
  * Array of different document authenticity checks
  * @type {uRAuthenticityCheck[]}
  */
  @ValidateNested({ each: true })
  @Transform(({ obj }) => uRAuthenticityCheck.transformList(obj.checks), { toClassOnly: true })
  @IsArray()
  @Default([])
  checks: uRAuthenticityCheck[]

  /**
  * Create instance of RAuthenticityCheckListItem from plain object
  * @param {AllowPrimitives<iRAuthenticityCheckListItem>} input - plain object
  * @returns {RAuthenticityCheckListItem}
  */
  static fromPlain = (input: AllowPrimitives<iRAuthenticityCheckListItem>): RAuthenticityCheckListItem =>
    plainToClass(RAuthenticityCheckListItem, input)

  /**
  * Gets validation errors of RAuthenticityCheckListItem
  * @param {RAuthenticityCheckListItem} input - input data
  * @returns {ValidationError[]} - array of validation errors
  */
  static getValidationErrors = (input: RAuthenticityCheckListItem): ValidationError[] => validateSync(input)
}
