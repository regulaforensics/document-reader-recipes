import { IsDefined, IsEnum, IsNumber, IsString } from 'class-validator'
import { eBarCodeModuleType } from '@regulaforensics/document-reader-typings'


export interface iRDocumentBarcodeModuleData {
  length: number
  type: eBarCodeModuleType
  data: string
}

export class RDocumentBarcodeModuleData implements iRDocumentBarcodeModuleData {
  @IsDefined()
  @IsNumber()
  length: number

  @IsDefined()
  @IsEnum(eBarCodeModuleType)
  type: eBarCodeModuleType

  @IsDefined()
  @IsString()
  data: string
}
