import { IsDefined, IsEnum, IsNumber, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { eBarCodeType, eBarCodeResultCodes } from '@regulaforensics/document-reader-typings'

import { iRDocumentBarcodeModuleData, RDocumentBarcodeModuleData } from './document-barcode-module-data.model'


/**
* Used for storing document barcode field.
*/
export interface iRDocumentBarcodeField {
  /**
  * Field index
  * @type {number}
  */
  fieldIndex: number

  /**
  * Barcode type
  * @type {eBarCodeType}
  */
  type: eBarCodeType

  /**
  * Barcode reading result code
  * @type {eBarCodeResultCodes}
  */
  resultCode: eBarCodeResultCodes

  /**
  * Array of barcode modules data
  * @type {iRDocumentBarcodeModuleData[]}
  */
  modulesData: iRDocumentBarcodeModuleData[]
}

/**
* Used for storing document barcode field.
*/
export class RDocumentBarcodeField implements iRDocumentBarcodeField {
  /**
  * Field index
  * @type {number}
  */
  @IsDefined()
  @IsNumber()
  fieldIndex: number

  /**
  * Barcode type
  * @type {eBarCodeType}
  */
  @IsDefined()
  @IsEnum(eBarCodeType)
  type: eBarCodeType

  /**
  * Barcode reading result code
  * @type {eBarCodeResultCodes}
  */
  @IsDefined()
  @IsEnum(eBarCodeResultCodes)
  resultCode: eBarCodeResultCodes

  /**
  * Array of barcode modules data
  * @type {RDocumentBarcodeModuleData[]}
  */
  @IsDefined()
  @Type(() => RDocumentBarcodeModuleData)
  @ValidateNested({ each: true })
  modulesData: RDocumentBarcodeModuleData[]
}
