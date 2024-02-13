import { plainToClass } from 'class-transformer'
import { IsDefined, IsEnum, IsIn, validateSync, ValidationError } from 'class-validator'
import { eRfidErrorCodes } from '@regulaforensics/document-reader-typings'

import { AllowPrimitives } from '@/types'
import { eDataGroup } from './consts'


export type tRfidDataGroupStatus =
  eRfidErrorCodes.ERROR_NOT_PERFORMED |
  eRfidErrorCodes.ERROR_NOT_AVAILABLE |
  eRfidErrorCodes.ERROR_NO_ERROR |
  eRfidErrorCodes.ERROR_FAILED

/**
* Rfid data group status
*/
export interface iRRfidDataGroupStatus {
  /**
  * Data group
  * @type {eDataGroup}
  */
  group: eDataGroup

  /**
  * Status
  * @type {tRfidDataGroupStatus}
  */
  status: tRfidDataGroupStatus
}

/**
* Rfid data group status
*/
export class RRfidDataGroupStatus implements iRRfidDataGroupStatus {
  /**
  * Data group
  * @type {eDataGroup}
  */
  @IsDefined()
  @IsEnum(eDataGroup)
  group: eDataGroup

  /**
  * Status
  * @type {tRfidDataGroupStatus}
  */
  @IsDefined()
  @IsIn([
    eRfidErrorCodes.ERROR_NOT_PERFORMED,
    eRfidErrorCodes.ERROR_NOT_AVAILABLE,
    eRfidErrorCodes.ERROR_NO_ERROR,
    eRfidErrorCodes.ERROR_FAILED
  ])
  status: tRfidDataGroupStatus

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
