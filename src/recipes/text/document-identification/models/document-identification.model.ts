import { IsDefined, IsNumber, IsString, validateSync } from 'class-validator'
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

  static isValid = (input: RDocumentIdentification): boolean => {
    const errors = validateSync(input)

    if (errors.length) {
      console.error(errors)

      return false
    }

    return true
  }
}
