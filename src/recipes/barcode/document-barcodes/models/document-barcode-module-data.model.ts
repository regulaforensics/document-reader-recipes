import { IsDefined, IsEnum, IsNumber, IsString } from 'class-validator'
import { eBarCodeModuleType } from '@regulaforensics/document-reader-typings'


/**
* Used for storing document barcode module data.
*/
export interface iRDocumentBarcodeModuleData {
  /**
  * Number of significant elements of data
  * @type {number}
  */
  length: number

  /**
  * Module type
  * @type {eBarCodeModuleType}
  */
  type: eBarCodeModuleType

  /**
  * Read module data
  * @type {string}
  */
  data: string
}

/**
* Used for storing document barcode module data.
*/
export class RDocumentBarcodeModuleData implements iRDocumentBarcodeModuleData {
  /**
  * Number of significant elements of data
  * @type {number}
  */
  @IsDefined()
  @IsNumber()
  length: number

  /**
  * Module type
  * @type {eBarCodeModuleType}
  */
  @IsDefined()
  @IsEnum(eBarCodeModuleType)
  type: eBarCodeModuleType

  /**
  * Read module data
  * @type {string}
  */
  @IsDefined()
  @IsString()
  data: string
}
