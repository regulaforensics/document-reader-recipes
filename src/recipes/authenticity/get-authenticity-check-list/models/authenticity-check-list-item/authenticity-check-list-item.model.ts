import { plainToClass, Type } from 'class-transformer'
import { IsDefined, IsInt, ValidateNested, validateSync, ValidationError } from 'class-validator'

import { AllowPrimitives } from '@/types'
import {
  iRAuthenticityBarcodeCheckListItem,
  iRAuthenticityImageCheckListItem,
  iRAuthenticityIpiCheckListItem, RAuthenticityBarcodeCheckListItem,
  RAuthenticityImageCheckListItem,
  RAuthenticityIpiCheckListItem
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
  * Images check list
  * @type {iRAuthenticityImageCheckListItem[]}
  */
  images: iRAuthenticityImageCheckListItem[]

  /**
  * IPI
  * @type {iRAuthenticityIpiCheckListItem[]}
  */
  ipi: iRAuthenticityIpiCheckListItem[]

  /**
  * Barcode
  * @type {iRAuthenticityBarcodeCheckListItem[]}
  */
  barcode: iRAuthenticityBarcodeCheckListItem[]
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
  * IPI
  * @type {RAuthenticityIpiCheckListItem[]}
  */
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => RAuthenticityIpiCheckListItem)
  ipi: RAuthenticityIpiCheckListItem[]

  /**
  * Barcode
  * @type {RAuthenticityBarcodeCheckListItem[]}
  */
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => RAuthenticityBarcodeCheckListItem)
  barcode: RAuthenticityBarcodeCheckListItem[]

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
