import { IsBoolean, IsDefined, IsNumber, IsString, validateSync, ValidationError } from 'class-validator'
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

  /**
  * Is deprecated
  * @type {boolean}
  */
  isDeprecated: boolean

  /**
  * Probability
  * @type {number}
  */
  probability: number

  /**
  * Document id
  * @type {number}
  */
  documentId: number
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
  * Is deprecated
  * @type {boolean}
  */
  @IsDefined()
  @IsBoolean()
  isDeprecated: boolean

  /**
  * Probability
  * @type {number}
  */
  @IsDefined()
  @IsNumber()
  probability: number

  /**
  * Document id
  * @type {number}
  */
  @IsDefined()
  @IsNumber()
  documentId: number

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
