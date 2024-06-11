import { IsDefined, IsEnum, IsIn, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

import { eResultType, } from '@regulaforensics/document-reader-typings'
import { iRLocation, RLocation } from '../location'


export type tAuthenticityTextCheckReferenceType = eResultType.MRZ_OCR_EXTENDED | eResultType.VISUAL_OCR_EXTENDED | eResultType.BARCODES_TEXT_DATA

export const AuthenticityTextCheckReferenceTypes: tAuthenticityTextCheckReferenceType[] = [
  eResultType.MRZ_OCR_EXTENDED,
  eResultType.VISUAL_OCR_EXTENDED,
  eResultType.BARCODES_TEXT_DATA,
]

export interface iRAuthenticityTextCheckReference {
  type: tAuthenticityTextCheckReferenceType

  reference: string

  result: string

  location: iRLocation
}

export class RAuthenticityTextCheckReference implements iRAuthenticityTextCheckReference {
  @IsDefined()
  @IsEnum(eResultType)
  @IsIn(AuthenticityTextCheckReferenceTypes)
  type: tAuthenticityTextCheckReferenceType

  @IsDefined()
  @IsString()
  reference: string

  @IsDefined()
  @IsString()
  result: string

  /**
  * Area location
  * @type {RLocation}
  */
  @IsDefined()
  @ValidateNested()
  @Type(() => RLocation)
  location: RLocation
}
