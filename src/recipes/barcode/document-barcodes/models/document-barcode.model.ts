import { IsDefined, IsNumber, ValidateNested, validateSync, ValidationError } from 'class-validator'
import { plainToClass, Type } from 'class-transformer'

import { AllowPrimitives } from '@/types'
import { iRDocumentBarcodeField, RDocumentBarcodeField } from './document-barcode-field.model'


/**
* Used for storing document barcode.
*/
export interface iRDocumentBarcode {
  /**
  * Page index of the document where the barcode was found
  * @type {number}
  */
  pageIndex: number

  /**
  * Array of barcode fields
  * @type {iRDocumentBarcodeField[]}
  */
  fields: iRDocumentBarcodeField[]
}

/**
* Used for storing document barcode.
*/
export class RDocumentBarcode implements iRDocumentBarcode {
  /**
  * Page index of the document where the barcode was found
  * @type {number}
  */
  @IsDefined()
  @IsNumber()
  pageIndex: number

  /**
  * Array of barcode fields
  * @type {RDocumentBarcodeField[]}
  */
  @IsDefined()
  @Type(() => RDocumentBarcodeField)
  @ValidateNested({ each: true })
  fields: RDocumentBarcodeField[]

  /**
  * Creates an instance of RDocumentBarcode.
  * @param {AllowPrimitives<iRDocumentBarcode>} input - plain object
  * @returns {RDocumentBarcode}
  */
  static fromPlain = (input: AllowPrimitives<iRDocumentBarcode>): RDocumentBarcode => plainToClass(RDocumentBarcode, input)

  /**
  * Gets validation errors of RDocumentBarcode
  * @param {RDocumentBarcode} input - input data
  * @returns {ValidationError[]} - array of validation errors
  */
  static getValidationErrors = (input: RDocumentBarcode): ValidationError[] => validateSync(input)

  /**
  * Validates RDocumentBarcode
  * @param {RDocumentBarcode[] | RDocumentBarcode} input - input data
  * @returns {boolean} - true if input data is valid
  */
  static isValid = (input: RDocumentBarcode[] | RDocumentBarcode): boolean => {
    const items = Array.isArray(input) ? input : [input]

    return items.every(item => RDocumentBarcode.getValidationErrors(item).length === 0)
  }
}
