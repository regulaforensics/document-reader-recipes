import { IsDefined, IsNumber, IsString, validateSync, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'

import { AllowPrimitives } from '@/types'


/**
* Document identification
*/
export interface iRDocumentIdentification {
  /**
  * Page index
  * @type {number}
  */
  pageIndex: number

  /**
  * Document name
  * @type {string}
  */
  documentName: string
}

/**
* Document identification
*/
export class RDocumentIdentification implements iRDocumentIdentification {
  /**
  * Page index
  * @type {number}
  */
  @IsDefined()
  @IsNumber()
  pageIndex: number

  /**
  * Document name
  * @type {string}
  */
  @IsDefined()
  @IsString()
  documentName: string

  /**
  * Create RDocumentIdentification from plain object
  * @param {AllowPrimitives<iRDocumentIdentification>} input
  * @returns {RDocumentIdentification}
  */
  static fromPlain = (input: AllowPrimitives<iRDocumentIdentification>): RDocumentIdentification => plainToClass(RDocumentIdentification, input)

  /**
  * Get validation errors
  * @param {RDocumentIdentification} input
  * @returns {ValidationError[]}
  */
  static getValidationErrors = (input: RDocumentIdentification): ValidationError[] => validateSync(input)

  /**
  * Check if input is valid
  * @param {RDocumentIdentification | RDocumentIdentification[]} input - An RDocumentIdentification or array of RDocumentIdentification to check for validity
  * @returns {boolean}
  */
  static isValid = (input: RDocumentIdentification | RDocumentIdentification[]): boolean => {
    const items = Array.isArray(input) ? input : [input]
    return items.every((item) => RDocumentIdentification.getValidationErrors(item).length === 0)
  }
}
