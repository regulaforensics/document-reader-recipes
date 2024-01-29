import { IsDefined, IsInt, IsString, validateSync, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'

import { AllowPrimitives } from '@/types'


/**
* Short version of graphic field representation
*/
export interface iRGraphicField {
  /**
  * Image file in base64 url representation
  * @type {string}
  */
  src: string

  /**
  * Image width
  * @type {number}
  */
  width: number

  /**
  * Image height
  * @type {number}
  */
  height: number
}

/**
* Short version of graphic field representation
*/
export class RGraphicField implements iRGraphicField {
  /**
  * Image file in base64 url representation
  * @type {string}
  */
  @IsDefined()
  @IsString()
  src: string

  /**
  * Image width
  * @type {number}
  */
  @IsDefined()
  @IsInt()
  width: number

  /**
  * Image height
  * @type {number}
  */
  @IsDefined()
  @IsInt()
  height: number

  /**
  * Create instance of RGraphicField from plain object
  * @param {AllowPrimitives<iRGraphicField>} input - plain object
  * @returns {RGraphicField}
  */
  static fromPlain = (input: AllowPrimitives<iRGraphicField>): RGraphicField => plainToClass(RGraphicField, input)

  /**
  * Get validation errors of RGraphicField
  * @param {RGraphicField} input - RGraphicField object
  * @returns {ValidationError[]}
  */
  static getValidationErrors = (input: RGraphicField): ValidationError[] => validateSync(input)

  /**
  * Check if RGraphicField is valid
  * @param {RGraphicField | RGraphicField[]} input - RGraphicField object or array of RGraphicField objects
  * @returns {boolean}
  */
  static isValid = (input: RGraphicField | RGraphicField[]): boolean => {
    const objects = Array.isArray(input) ? input : [input]
    return objects.every((item) => RGraphicField.getValidationErrors(item).length === 0)
  }
}
