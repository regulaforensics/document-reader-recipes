import { IsDefined, IsEnum, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { eCheckResult, eLCID } from '@regulaforensics/document-reader-typings'

import { Default } from '@/decorators'
import { iRTextDataSource, RTextDataSource } from './text-data-source.model'


export interface iRTextData {
  name: string
  value: string
  checkResult: eCheckResult
  lcid: eLCID
  bySource: iRTextDataSource[]
}

export class RTextData implements iRTextData {
  @IsDefined()
  @IsString()
  name: string

  @IsDefined()
  @IsString()
  value: string

  @IsDefined()
  @IsEnum(eCheckResult)
  checkResult: eCheckResult

  @IsDefined()
  @IsEnum(eLCID)
  @Default(eLCID.ENGLISH_US)
  lcid: eLCID

  @IsDefined()
  @Type(() => RTextDataSource)
  @ValidateNested({ each: true })
  bySource: RTextDataSource[]
}
