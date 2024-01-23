import { IsDefined, IsEnum, IsNumber, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { eBarCodeType, eBarCodeResultCodes } from '@regulaforensics/document-reader-typings'

import { iRDocumentBarcodeModuleData, RDocumentBarcodeModuleData } from './document-barcode-module-data.model'


export interface iRDocumentBarcodeField {
  fieldIndex: number
  type: eBarCodeType
  resultCode: eBarCodeResultCodes
  modulesData: iRDocumentBarcodeModuleData[]
}

export class RDocumentBarcodeField implements iRDocumentBarcodeField {
  @IsDefined()
  @IsNumber()
  fieldIndex: number

  @IsDefined()
  @IsEnum(eBarCodeType)
  type: eBarCodeType

  @IsDefined()
  @IsEnum(eBarCodeResultCodes)
  resultCode: eBarCodeResultCodes

  @IsDefined()
  @Type(() => RDocumentBarcodeModuleData)
  @ValidateNested({ each: true })
  modulesData: RDocumentBarcodeModuleData[]
}
