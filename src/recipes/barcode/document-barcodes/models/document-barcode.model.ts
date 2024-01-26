import { IsDefined, IsNumber, ValidateNested, validateSync } from 'class-validator'
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
  * Validates input data
  * @param {RDocumentBarcode} input - input data
  * @returns {boolean} - true if input data is valid
  */
  static isValid = (input: RDocumentBarcode): boolean => {
    const errors = validateSync(input)

    if (errors.length) {
      console.error('RDocumentBarcode validation errors:', errors)
      return false
    }

    return true
  }

  /**
  * Validates array of RDocumentBarcode
  * @param {RDocumentBarcode[]} input - input data
  * @returns {boolean} - true if input data is valid
  */
  static isAllValid = (input: RDocumentBarcode[]): boolean => input.every(RDocumentBarcode.isValid)
}
