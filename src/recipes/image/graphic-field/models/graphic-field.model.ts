import { IsDefined, IsInt, IsString } from 'class-validator'
import { plainToClass } from 'class-transformer'

import { AllowPrimitives } from '@/types'


export interface iRGraphicField {
  src: string
  width: number
  height: number
}

export class RGraphicField implements iRGraphicField {
  @IsDefined()
  @IsString()
  src: string

  @IsDefined()
  @IsInt()
  width: number

  @IsDefined()
  @IsInt()
  height: number

  static fromPlain = (input: AllowPrimitives<iRGraphicField>): RGraphicField => plainToClass(RGraphicField, input)
}
