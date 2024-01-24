import { plainToClass, Type } from 'class-transformer'
import { IsDefined, IsEnum, IsString, ValidateNested } from 'class-validator'
import { eLights } from '@regulaforensics/document-reader-typings'

import { AllowPrimitives } from '@/types'
import { RDocumentImagePage, iRDocumentImagePage } from './document-image-page.model'


export interface iRDocumentImage {
  light: eLights
  name: string
  pages: iRDocumentImagePage[]
}

export class RDocumentImage implements iRDocumentImage {
  @IsDefined()
  @IsEnum(eLights)
  light: eLights

  @IsDefined()
  @IsString()
  name: string

  @IsDefined()
  @Type(() => RDocumentImagePage)
  @ValidateNested({ each: true })
  pages: RDocumentImagePage[]

  static fromPlain = (input: AllowPrimitives<iRDocumentImage>): RDocumentImage => plainToClass(RDocumentImage, input)
}
