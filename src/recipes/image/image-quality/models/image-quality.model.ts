import { IsDefined, IsNumber, ValidateNested } from 'class-validator'
import { plainToClass, Type } from 'class-transformer'

import { AllowPrimitives } from '@/types'
import { iRImageQualityCheck, RImageQualityCheck } from './image-quality-check.model'


export interface iRImageQuality {
  pageIndex: number
  checks: iRImageQualityCheck[]
}

export class RImageQuality implements iRImageQuality {
  @IsDefined()
  @IsNumber()
  pageIndex: number

  @IsDefined()
  @Type(() => RImageQualityCheck)
  @ValidateNested({ each: true })
  checks: RImageQualityCheck[]

  static fromPlain = (input: AllowPrimitives<iRImageQuality>): RImageQuality => plainToClass(RImageQuality, input)
}
