import { plainToClass, Type } from 'class-transformer'
import { IsDefined, IsInt, ValidateNested, validateSync, ValidationError } from 'class-validator'

import { AllowPrimitives } from '@/types'
import { iRAuthenticityImageCheckListItem, RAuthenticityImageCheckListItem } from './children'


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
  * Images check list
  * @type {iRAuthenticityImageCheckListItem[]}
  */
  images: iRAuthenticityImageCheckListItem[]
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
  * Images check list
  * @type {RAuthenticityImageCheckListItem[]}
  */
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => RAuthenticityImageCheckListItem)
  images: RAuthenticityImageCheckListItem[]

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
