import { plainToClass } from 'class-transformer'
import { IsDefined, IsEnum, IsInt, validateSync, ValidationError } from 'class-validator'

import { AllowPrimitives } from '@/types'
import { eDataGroupReadStatus } from './consts'


/**
* Rfid data group status
*/
export interface iRRfidDataGroupStatus {
  /**
  * Data group
  * @type {number}
  */
  group: number

  /**
  * Data group read status
  * @type {eDataGroupReadStatus}
  */
  status: eDataGroupReadStatus
}

/**
* Rfid data group status
*/
export class RRfidDataGroupStatus implements iRRfidDataGroupStatus {
  /**
  * Data group
  * @type {number}
  */
  @IsDefined()
  @IsInt()
  group: number

  /**
  * Status
  * @type {eDataGroupReadStatus}
  */
  @IsDefined()
  @IsEnum(eDataGroupReadStatus)
  status: eDataGroupReadStatus

  /**
  * Create instance of RRfidDataGroupStatus from plain object
  * @param {AllowPrimitives<iRRfidDataGroupStatus>} input - plain object
  * @returns {RRfidDataGroupStatus}
  */
  static fromPlain = (input: AllowPrimitives<iRRfidDataGroupStatus>): RRfidDataGroupStatus => plainToClass(RRfidDataGroupStatus, input)

  /**
  * Gets validation errors of RRfidDataGroupStatus
  * @param {RRfidDataGroupStatus} input - input data
  * @returns {ValidationError[]} - array of validation errors
  */
  static getValidationErrors = (input: RRfidDataGroupStatus): ValidationError[] => validateSync(input)
}
