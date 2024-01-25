import { IsDefined, IsInt, IsString } from 'class-validator'


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
}
