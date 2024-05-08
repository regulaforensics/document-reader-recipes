import { plainToClass, Type } from 'class-transformer'
import { IsDefined, IsEnum, IsInt, ValidateNested, validateSync, ValidationError } from 'class-validator'
import { eCheckResult } from '@regulaforensics/document-reader-typings'

import { AllowPrimitives } from '@/types'
import { RAuthenticityCheckGroup } from './children'


/**
* Authenticity check list groups item
*/
export interface iRAuthenticityCheckGroupsItem {
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

  groups: RAuthenticityCheckGroup[]
}

/**
* Authenticity check list groups item
*/
export class RAuthenticityCheckGroupsItem implements iRAuthenticityCheckGroupsItem {
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

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => RAuthenticityCheckGroup)
  groups: RAuthenticityCheckGroup[]

  /**
  * Create instance of RAuthenticityCheckListItem from plain object
  * @param {AllowPrimitives<iRAuthenticityCheckGroupsItem>} input - plain object
  * @returns {RAuthenticityCheckGroupsItem}
  */
  static fromPlain = (input: AllowPrimitives<iRAuthenticityCheckGroupsItem>): RAuthenticityCheckGroupsItem =>
    plainToClass(RAuthenticityCheckGroupsItem, input)

  /**
  * Gets validation errors of RAuthenticityCheckListItem
  * @param {RAuthenticityCheckGroupsItem} input - input data
  * @returns {ValidationError[]} - array of validation errors
  */
  static getValidationErrors = (input: RAuthenticityCheckGroupsItem): ValidationError[] => validateSync(input)
}
