import { IsDefined, IsNumber, ValidateNested } from 'class-validator'
import { plainToClass, Type } from 'class-transformer'

import { AllowPrimitives } from '@/types'
import { iRDocumentBarcodeField, RDocumentBarcodeField } from './document-barcode-field.model'


export interface iRDocumentBarcode {
  pageIndex: number
  fields: iRDocumentBarcodeField[]
}

export class RDocumentBarcode implements iRDocumentBarcode {
  @IsDefined()
  @IsNumber()
  pageIndex: number

  @IsDefined()
  @Type(() => RDocumentBarcodeField)
  @ValidateNested({ each: true })
  fields: RDocumentBarcodeField[]

  static fromPlain = (input: AllowPrimitives<iRDocumentBarcode>): RDocumentBarcode => plainToClass(RDocumentBarcode, input)
}
