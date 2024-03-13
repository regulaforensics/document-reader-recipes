import { plainToClass, Type } from 'class-transformer'
import { IsDefined, IsEnum, IsInt, ValidateNested, validateSync, ValidationError } from 'class-validator'
import { eCheckResult } from '@regulaforensics/document-reader-typings'

import { AllowPrimitives } from '@/types'
import {
  iRAuthenticityIdentCheckListItem,
  iRAuthenticityPhotoIdentCheckListItem,
  iRAuthenticitySecurityCheckListItem,
  RAuthenticityIdentCheckListItem,
  RAuthenticityPhotoIdentCheckListItem,
  RAuthenticitySecurityCheckListItem
} from './children'


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
  * Images check list
  * @type {iRAuthenticityIdentCheckListItem[]}
  */
  ident: iRAuthenticityIdentCheckListItem[]

  /**
  * IPI
  * @type {iRAuthenticityPhotoIdentCheckListItem[]}
  */
  photoIdent: iRAuthenticityPhotoIdentCheckListItem[]

  /**
  * Barcode
  * @type {iRAuthenticitySecurityCheckListItem[]}
  */
  security: iRAuthenticitySecurityCheckListItem[]
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
  * Images check list
  * @type {RAuthenticityIdentCheckListItem[]}
  */
  @IsDefined()
  @Type(() => RAuthenticityIdentCheckListItem)
  @ValidateNested({ each: true })
  ident: RAuthenticityIdentCheckListItem[]

  /**
  * IPI
  * @type {RAuthenticityPhotoIdentCheckListItem[]}
  */
  @IsDefined()
  @Type(() => RAuthenticityPhotoIdentCheckListItem)
  @ValidateNested({ each: true })
  photoIdent: RAuthenticityPhotoIdentCheckListItem[]

  /**
  * Barcode
  * @type {RAuthenticitySecurityCheckListItem[]}
  */
  @IsDefined()
  @Type(() => RAuthenticitySecurityCheckListItem)
  @ValidateNested({ each: true })
  security: RAuthenticitySecurityCheckListItem[]

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
