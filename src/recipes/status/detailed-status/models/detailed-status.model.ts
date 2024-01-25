import { IsDefined, ValidateNested, validateSync } from 'class-validator'
import { plainToClass, Type } from 'class-transformer'

import { AllowPrimitives } from '@/types'
import { iRDetailedStatusOptical, RDetailedStatusOptical } from './detailed-status-optical.model'


export interface iRDetailedStatus {
  optical: iRDetailedStatusOptical
}

export class RDetailedStatus implements iRDetailedStatus {
  @IsDefined()
  @Type(() => RDetailedStatusOptical)
  @ValidateNested()
  optical: RDetailedStatusOptical

  static fromPlain = (input: AllowPrimitives<iRDetailedStatus>): RDetailedStatus => plainToClass(RDetailedStatus, input)

  static isValid = (input: RDetailedStatus): boolean => {
    const errors = validateSync(input)

    if (errors.length) {
      console.error(errors)

      return false
    }

    return true
  }
}
