import { IsDefined, IsInt, IsString } from 'class-validator'


export interface iRDocumentImagePage {
  pageIndex: number
  src: string
  width: number
  height: number
}

export class RDocumentImagePage implements iRDocumentImagePage {
  @IsDefined()
  @IsInt()
  pageIndex: number

  @IsDefined()
  @IsString()
  src: string

  @IsDefined()
  @IsInt()
  width: number

  @IsDefined()
  @IsInt()
  height: number
}
