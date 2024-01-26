import { IsDefined, IsEnum, IsString } from 'class-validator'
import { eCheckResult } from '@regulaforensics/document-reader-typings'
import { plainToClass } from 'class-transformer'

import { Default } from '@/decorators'
import { AllowPrimitives } from '@/types'


export interface iRTextFieldValue {
  value: string
  status: eCheckResult
}

export class RTextFieldValue implements iRTextFieldValue {
  @IsDefined()
  @IsString()
  @Default('')
  value: string

  @IsDefined()
  @IsEnum(eCheckResult)
  @Default(eCheckResult.WAS_NOT_DONE)
  status: eCheckResult

  static fromPlain = (input: AllowPrimitives<iRTextFieldValue>): RTextFieldValue => plainToClass(RTextFieldValue, input)
}
