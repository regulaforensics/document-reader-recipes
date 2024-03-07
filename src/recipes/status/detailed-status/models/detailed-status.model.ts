import { IsDefined, IsEnum, ValidateNested, validateSync, ValidationError } from 'class-validator'
import { plainToClass, Type } from 'class-transformer'
import { eCheckResult } from '@regulaforensics/document-reader-typings'

import { AllowPrimitives } from '@/types'
import { iRDetailedStatusOptical, RDetailedStatusOptical } from './detailed-status-optical.model'
import { iRDetailedStatusSummary, RDetailedStatusSummary } from './detailed-status-summary.model'
import { iRDetailedStatusRfid, RDetailedStatusRfid } from './detailed-status-rfid.model'


/**
* Get detailed status of a document processing
*/
export interface iRDetailedStatus {
  /**
  * Overall status
  * @type {eCheckResult}
  */
  overallStatus: eCheckResult

  /**
  * Detailed status of optical checks
  * @type {iRDetailedStatusOptical}
  */
  optical: iRDetailedStatusOptical

  /**
  * Detailed status of RFID checks
  * @type {iRDetailedStatusRfid}
  */
  rfId: iRDetailedStatusRfid

  /**
  * Summary of all checks
  * @type {iRDetailedStatusOptical}
  */
  summary: iRDetailedStatusSummary
}

/**
* Get detailed status of a document processing
*/
export class RDetailedStatus implements iRDetailedStatus {
  /**
  * Overall status
  * @type {eCheckResult}
  */
  @IsDefined()
  @IsEnum(eCheckResult)
  overallStatus: eCheckResult

  /**
  * Optical statuses
  * @type {RDetailedStatusOptical}
  */
  @IsDefined()
  @Type(() => RDetailedStatusOptical)
  @ValidateNested()
  optical: RDetailedStatusOptical

  /**
  * Detailed status of RFID checks
  * @type {RDetailedStatusRfid}
  */
  @IsDefined()
  @Type(() => RDetailedStatusRfid)
  @ValidateNested()
  rfId: RDetailedStatusRfid

  /**
  * Summary of all checks
  * @type {RDetailedStatusSummary}
  */
  @IsDefined()
  @Type(() => RDetailedStatusSummary)
  @ValidateNested()
  summary: RDetailedStatusSummary

  /**
  * Create a RDetailedStatus instance from plain object
  * @param {AllowPrimitives<iRDetailedStatus>} input
  * @returns {RDetailedStatus}
  */
  static fromPlain = (input: AllowPrimitives<iRDetailedStatus>): RDetailedStatus => plainToClass(RDetailedStatus, input)

  /**
  * Get validation errors
  * @param {RDetailedStatus} input
  * @returns {ValidationError[]}
  */
  static getValidationErrors = (input: RDetailedStatus): ValidationError[] => validateSync(input)

  /**
  * Check if input is valid
  * @param {RDetailedStatus | RDetailedStatus[]} input - Array of RDetailedStatus instances or single instance
  * @returns {boolean}
  */
  static isValid = (input: RDetailedStatus | RDetailedStatus[]): boolean => {
    const objects = Array.isArray(input) ? input : [input]

    return objects.every((object) => RDetailedStatus.getValidationErrors(object).length === 0)
  }
}
