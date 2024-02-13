import { plainToClass } from 'class-transformer'
import { IsDefined, IsEnum, validateSync, ValidationError } from 'class-validator'
import { eCheckResult, eRfidDataFileType, eRfidErrorCodes } from '@regulaforensics/document-reader-typings'

import { AllowPrimitives } from '@/types'


/**
* Rfid data group status item
*/
export interface iRRfidDataGroupStatusItem {
  /**
  * Data group
  * @type {eDataGroup}
  */
  group: eRfidDataFileType

  /**
  * Status
  * @type {tRfidDataGroupStatus}
  */
  status: eCheckResult
}

/**
* Rfid data group status item
*/
export class RRfidDataGroupStatusItem implements iRRfidDataGroupStatusItem {
  /**
  * Data group
  * @type {eDataGroup}
  */
  @IsDefined()
  @IsEnum(eRfidDataFileType)
  group: eRfidDataFileType

  /**
  * Status
  * @type {tRfidDataGroupStatus}
  */
  @IsDefined()
  @IsEnum(eCheckResult)
  status: eCheckResult

  /**
  * Create instance of RRfidDataGroupStatusItem from plain object
  * @param {AllowPrimitives<iRRfidDataGroupStatusItem>} input - plain object
  * @returns {RRfidDataGroupStatus}
  */
  static fromPlain = (input: AllowPrimitives<iRRfidDataGroupStatusItem>): RRfidDataGroupStatusItem => plainToClass(RRfidDataGroupStatusItem, input)

  /**
  * Gets validation errors of RRfidDataGroupStatusItem
  * @param {RRfidDataGroupStatusItem} input - input data
  * @returns {ValidationError[]} - array of validation errors
  */
  static getValidationErrors = (input: RRfidDataGroupStatusItem): ValidationError[] => validateSync(input)
}
