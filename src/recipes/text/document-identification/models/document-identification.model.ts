import { IsDefined, IsNumber, IsString } from 'class-validator'
import { plainToClass } from 'class-transformer'

import { AllowPrimitives } from '@/types'


export interface iRDocumentIdentification {
  pageIndex: number
  documentName: string
}

export class RDocumentIdentification implements iRDocumentIdentification {
  @IsDefined()
  @IsNumber()
  pageIndex: number

  @IsDefined()
  @IsString()
  documentName: string

  static fromPlain = (input: AllowPrimitives<iRDocumentIdentification>): RDocumentIdentification => plainToClass(RDocumentIdentification, input)
}
