import { IsDefined, IsEnum, IsInt, IsOptional, IsString } from 'class-validator'
import { eSource } from '@regulaforensics/document-reader-typings'


/**
* Short version of image representation
*/
export interface iRDocumentImagePage {
  /**
  * Page index
  * @type {number}
  */
  pageIndex: number

  /**
  * Image file in base64 url representation
  * @type {string|undefined}
  */
  src?: string

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

  /**
  * Source of the image
  * @type {eSource}
  */
  source: eSource
}

/**
* Short version of image representation
*/
export class RDocumentImagePage implements iRDocumentImagePage {
  /**
  * Page index
  * @type {number}
  */
  @IsDefined()
  @IsInt()
  pageIndex: number

  /**
  * Image file in base64 url representation
  * @type {string|undefined}
  */
  @IsOptional()
  @IsString()
  src?: string

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
  * Source of the image
  * @type {eSource}
  */
  @IsDefined()
  @IsEnum(eSource)
  source: eSource
}
