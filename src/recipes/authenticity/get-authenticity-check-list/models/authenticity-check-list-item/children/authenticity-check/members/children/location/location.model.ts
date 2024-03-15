import { IsDefined, IsEnum, IsNumber, ValidateNested } from 'class-validator'
import { Expose, Type } from 'class-transformer'
import { eLights } from '@regulaforensics/document-reader-typings'

import { iRRect, RRect } from './children'


/**
* Location
*/
export interface iRLocation {
  /**
  * Light
  * @type {eLights}
  */
  light: eLights

  /**
  * Rect
  * @type {RRect}
  */
  rect: iRRect
}

/**
* Location
*/
export class RLocation implements iRLocation {
  /**
  * Light
  * @type {eLights}
  */
  @Expose()
  @IsDefined()
  @IsEnum(eLights)
  light: eLights

  /**
  * Rect
  * @type {RRect}
  */
  @Expose()
  @IsDefined()
  @Type(() => RRect)
  @ValidateNested()
  rect: RRect
}
