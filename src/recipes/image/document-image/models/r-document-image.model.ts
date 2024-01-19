import { Type } from 'class-transformer'
import { IsDefined, IsEnum, IsString, ValidateNested } from 'class-validator'
import { eLights } from '@regulaforensics/document-reader-typings'

import { RDocumentImagePage, iRDocumentImagePage } from './r-document-image-page.model'


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
}
