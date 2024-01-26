import { plainToClass, Type } from 'class-transformer'
import { IsDefined, IsEnum, IsString, ValidateNested, validateSync } from 'class-validator'
import { eGraphicFieldType, eLights } from '@regulaforensics/document-reader-typings'

import { AllowPrimitives } from '@/types'
import { RDocumentImagePage, iRDocumentImagePage } from './document-image-page.model'


/**
* Short version of image representation
*/
export interface iRDocumentImage {
  /**
  * Lighting scheme used to capture the image
  * @type {eLights}
  */
  light: eLights

  /**
  * Field type
  * @type {eGraphicFieldType}
  */
  fieldType: eGraphicFieldType

  /**
  * Image file name
  * @type {string}
  */
  name: string

  /**
  * Image representation
  * @type {iRDocumentImagePage[]}
  */
  pages: iRDocumentImagePage[]
}

/**
* Short version of image representation
*/
export class RDocumentImage implements iRDocumentImage {
  /**
  * Lighting scheme used to capture the image
  * @type {eLights}
  */
  @IsDefined()
  @IsEnum(eLights)
  light: eLights

  /**
  * Field type
  * @type {eGraphicFieldType}
  */
  @IsDefined()
  @IsEnum(eGraphicFieldType)
  fieldType: eGraphicFieldType

  /**
  * Image file name
  * @type {string}
  */
  @IsDefined()
  @IsString()
  name: string

  /**
  * Image representation
  * @type {iRDocumentImagePage[]}
  */
  @IsDefined()
  @Type(() => RDocumentImagePage)
  @ValidateNested({ each: true })
  pages: RDocumentImagePage[]

  /**
  * Create instance of RDocumentImage from plain object
  * @param {AllowPrimitives<iRDocumentImage>} input - plain object
  * @returns {RDocumentImage}
  */
  static fromPlain = (input: AllowPrimitives<iRDocumentImage>): RDocumentImage => plainToClass(RDocumentImage, input)

  /**
  * Check if RDocumentImage is valid
  * @param {RDocumentImage} input - RDocumentImage object
  * @returns {boolean}
  */
  static isValid = (input: RDocumentImage): boolean => {
    const errors = validateSync(input)

    if (errors.length) {
      console.error(errors)

      return false
    }

    return true
  }
}
