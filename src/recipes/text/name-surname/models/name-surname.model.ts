import { IsDefined, IsEnum, IsString } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { eCheckResult, eLCID } from '@regulaforensics/document-reader-typings'


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
  * @param {unknown} input - plain object
  * @returns {RNameSurname}
  */
  static fromPlain = (input: unknown): RNameSurname => plainToClass(RNameSurname, input)
}
