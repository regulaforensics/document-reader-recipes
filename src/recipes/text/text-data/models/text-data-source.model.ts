import { IsDefined, IsEnum, IsString } from 'class-validator'
import { eCheckResult, eSource } from '@regulaforensics/document-reader-typings'

import { Default } from '@/decorators'


export interface iRTextDataSource {
  source: eSource
  checkResult: eCheckResult
  value: string
}

export class RTextDataSource implements iRTextDataSource {
  @IsDefined()
  @IsEnum(eSource)
  source: eSource

  @IsDefined()
  @IsEnum(eCheckResult)
  checkResult: eCheckResult

  @IsDefined()
  @IsString()
  @Default('')
  value: string
}
