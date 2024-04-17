import { IsDefined, IsEnum, IsString, ValidateNested, validateSync, ValidationError } from 'class-validator'
import { plainToClass, Type } from 'class-transformer'
import { eCheckResult, eLCID, eVisualFieldType } from '@regulaforensics/document-reader-typings'

import { Default } from '@/decorators'
import { AllowPrimitives } from '@/types'
import { iRTextDataSource, RTextDataSource } from './text-data-source.model'
import { iRTextDataComparison, RTextDataComparison } from './text-data-comparison.model'


/**
* Text data field with values by source
*/
export interface iRTextData {
  /**
  * Type of the text data field
  * @type {eVisualFieldType}
  */
  type: eVisualFieldType

  /**
  * Value of the text data field
  */
  value: string

  /**
  * Overall check result of the text data field
  * @type {eCheckResult}
  */
  checkResult: eCheckResult

  /**
  * LCID of the text data field
  * @type {eLCID}
  */
  lcid: eLCID

  /**
  * Values of the text data field by source
  * @type {iRTextDataSource[]}
  */
  bySource: iRTextDataSource[]

  /**
  * Comparison results list
  * @type {iRTextDataComparison[]}
  */
  comparisonList: iRTextDataComparison[]
}

/**
* Text data field with values by source
*/
export class RTextData implements iRTextData {
  /**
  * Type of the text data field
  * @type {eVisualFieldType}
  */
  @IsDefined()
  @IsEnum(eVisualFieldType)
  type: eVisualFieldType

  /**
  * Value of the text data field
  */
  @IsDefined()
  @IsString()
  value: string

  /**
  * Overall check result of the text data field
  * @type {eCheckResult}
  */
  @IsDefined()
  @IsEnum(eCheckResult)
  checkResult: eCheckResult

  /**
  * LCID of the text data field
  * @type {eLCID}
  */
  @IsDefined()
  @IsEnum(eLCID)
  @Default(eLCID.ENGLISH_US)
  lcid: eLCID

  /**
  * Comparison results list
  * @type {RTextDataComparison[]}
  */
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => RTextDataComparison)
  comparisonList: RTextDataComparison[]

  /**
  * Values of the text data field by source
  * @type {iRTextDataSource[]}
  */
  @IsDefined()
  @Type(() => RTextDataSource)
  @ValidateNested({ each: true })
  bySource: RTextDataSource[]

  /**
  * Create instance of RTextData from plain object
  * @param {AllowPrimitives<iRTextData>} input
  * @return {RTextData}
  */
  static fromPlain = (input: AllowPrimitives<iRTextData>): RTextData => plainToClass(RTextData, input)

  /**
  * Get validation errors
  * @param {RTextData} input
  * @return {ValidationError[]}
  */
  static getValidationErrors = (input: RTextData): ValidationError[] => validateSync(input)

  /**
  * Check if input is valid
  * @param {RTextData | RTextData[]} input - Array of RTextData or single RTextData
  * @return {boolean}
  */
  static isValid = (input: RTextData | RTextData[]): boolean => {
    const items = Array.isArray(input) ? input : [input]
    return items.every((item) => RTextData.getValidationErrors(item).length === 0)
  }
}
