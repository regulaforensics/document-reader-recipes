import { IsDefined, IsEnum, IsString, validateSync, ValidationError } from 'class-validator'
import { eCheckResult, eLCID } from '@regulaforensics/document-reader-typings'
import { plainToClass } from 'class-transformer'

import { Default } from '@/decorators'
import { AllowPrimitives } from '@/types'


/**
* Single text field value with check result
*/
export interface iRTextFieldValue {
  /**
  * Value of the text field
  * @type {string}
  */
  value: string

  /**
  * Status of check
  * @type {eCheckResult}
  */
  status: eCheckResult

  /**
  * LCID
  * @type {eLCID}
  */
  lcid: eLCID
}

/**
* Single text field value with check result
*/
export class RTextFieldValue implements iRTextFieldValue {
  /**
  * Value of the text field
  * @type {string}
  */
  @IsDefined()
  @IsString()
  @Default('')
  value: string

  /**
  * Status of check
  * @type {eCheckResult}
  */
  @IsDefined()
  @IsEnum(eCheckResult)
  @Default(eCheckResult.WAS_NOT_DONE)
  status: eCheckResult

  @IsDefined()
  @IsEnum(eLCID)
  @Default(eLCID.LATIN)
  lcid: eLCID

  /**
  * Create instance of RTextFieldValue from plain object
  * @param {AllowPrimitives<iRTextFieldValue>} input
  * @returns {RTextFieldValue}
  */
  static fromPlain = (input: AllowPrimitives<iRTextFieldValue>): RTextFieldValue => plainToClass(RTextFieldValue, input)

  /**
  * Check if input is valid
  * @param {RTextFieldValue} input
  * @returns {boolean}
  */
  static getValidationErrors = (input: RTextFieldValue): ValidationError[] => validateSync(input)

  /**
  * Check if input is valid
  * @param {RTextFieldValue | RTextFieldValue[]} input - Array of RTextFieldValue or single RTextFieldValue
  * @returns {boolean}
  */
  static isValid = (input: RTextFieldValue | RTextFieldValue[]): boolean => {
    if (Array.isArray(input)) {
      return input.every((i) => RTextFieldValue.getValidationErrors(i).length === 0)
    }

    return RTextFieldValue.getValidationErrors(input).length === 0
  }
}
