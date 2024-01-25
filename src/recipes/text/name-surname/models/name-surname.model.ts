import { IsDefined, IsEnum, IsString, validateSync } from 'class-validator'
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

  static isValid = (input: RNameSurname): boolean => {
    const errors = validateSync(input)

    if (errors.length) {
      console.error(errors)

      return false
    }

    return true
  }
}
