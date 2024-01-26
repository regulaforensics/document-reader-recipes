import { IsDefined, IsNumber, ValidateNested, validateSync } from 'class-validator'
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

  static isValid = (input: RImageQuality): boolean => {
    const errors = validateSync(input)

    if (errors.length) {
      console.error(errors)

      return false
    }

    return true
  }
}
