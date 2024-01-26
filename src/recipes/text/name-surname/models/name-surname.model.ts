import { IsDefined, IsEnum, IsString, validateSync, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { eCheckResult, eLCID } from '@regulaforensics/document-reader-typings'

import { AllowPrimitives } from '@/types'


/**
* Name and surname, LCID and check result
* If check result is ERROR - value will be UNKNOWN and LCID will be 1033 (English - United States)
*/
export interface iRNameSurname {
  /**
  * Name and surname
  * @type {string}
  */
  value: string

  /**
  * Check result
  * @type {eCheckResult}
  */
  checkResult: eCheckResult

  /**
  * LCID
  * @type {eLCID}
  */
  lcid: eLCID
}

/**
* Name and surname, LCID and check result
* If check result is ERROR - value will be UNKNOWN and LCID will be 1033 (English - United States)
*/
export class RNameSurname implements iRNameSurname {
  /**
  * Name and surname
  * @type {string}
  */
  @IsDefined()
  @IsString()
  value: string

  /**
  * Check result
  * @type {eCheckResult}
  */
  @IsDefined()
  @IsEnum(eCheckResult)
  checkResult: eCheckResult

  /**
  * LCID
  * @type {eLCID}
  */
  @IsDefined()
  @IsEnum(eLCID)
  lcid: eLCID

  /**
  * Create new RNameSurname instance from plain object
  * @param {AllowPrimitives<iRNameSurname>} input - plain object
  * @returns {RNameSurname}
  */
  static fromPlain = (input: AllowPrimitives<iRNameSurname>): RNameSurname => plainToClass(RNameSurname, input)

  /**
  * Get validation errors
  * @param {iRNameSurname} input - object to validate
  * @returns {ValidationError[]}
  */
  static getValidationErrors = (input: RNameSurname): ValidationError[] => validateSync(input)

  /**
  * Check if input is valid
  * @param {RNameSurname | RNameSurname[]} input - Array of RNameSurname or single RNameSurname
  * @returns {boolean}
  */
  static isValid = (input: RNameSurname | RNameSurname[]): boolean => {
    const items = Array.isArray(input) ? input : [input]

    return items.every((item) => RNameSurname.getValidationErrors(item).length === 0)
  }
}
