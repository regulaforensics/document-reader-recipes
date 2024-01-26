import { IsDefined, IsNumber, ValidateNested, validateSync, ValidationError } from 'class-validator'
import { plainToClass, Type } from 'class-transformer'

import { AllowPrimitives } from '@/types'
import { iRImageQualityCheck, RImageQualityCheck } from './image-quality-check.model'


/**
* Short version of structure which is used for storing input image quality check results list
*/
export interface iRImageQuality {
  /**
  * Page index (when working with multi-page document)
  * @type {number}
  */
  pageIndex: number

  /**
  * Array of single check result pointers
  * @type {iRImageQualityCheck[]}
  */
  checks: iRImageQualityCheck[]
}

/**
* Short version of structure which is used for storing input image quality check results list
*/
export class RImageQuality implements iRImageQuality {
  /**
  * Page index (when working with multi-page document)
  * @type {number}
  */
  @IsDefined()
  @IsNumber()
  pageIndex: number

  /**
  * Array of single check result pointers
  * @type {iRImageQualityCheck[]}
  */
  @IsDefined()
  @Type(() => RImageQualityCheck)
  @ValidateNested({ each: true })
  checks: RImageQualityCheck[]

  /**
  * Creates an instance of RImageQuality from plain object
  * @param {AllowPrimitives<iRImageQuality>} input - plain object
  * @returns {RImageQuality}
  */
  static fromPlain = (input: AllowPrimitives<iRImageQuality>): RImageQuality => plainToClass(RImageQuality, input)

  /**
  * Get validation errors
  * @param {RImageQuality} input - input data
  * @returns {ValidationError[]}
  */
  static getValidationErrors = (input: RImageQuality): ValidationError[] => validateSync(input)

  /**
  * Checks if RImageQuality is valid
  * @param {RImageQuality | RImageQuality[]} input - RImageQuality or array of RImageQuality to validate
  * @returns {boolean}
  */
  static isValid = (input: RImageQuality | RImageQuality[]): boolean => {
    const items = Array.isArray(input) ? input : [input]
    return items.every((item) => RImageQuality.getValidationErrors(item).length === 0)
  }
}
