import { IsArray, IsDefined, IsEnum, ValidateNested } from 'class-validator'
import { plainToInstance, Transform } from 'class-transformer'
import { eAuthenticity, eCheckResult, } from '@regulaforensics/document-reader-typings'

import { uRAuthenticityCheck } from './children'
import { Default } from '@/decorators'


export interface iRAuthenticityCheckGroup {
  group: eAuthenticity

  checkResult: eCheckResult

  checks: uRAuthenticityCheck[]
}

export class RAuthenticityCheckGroup implements iRAuthenticityCheckGroup {
  @IsDefined()
  @IsEnum(eAuthenticity)
  group: eAuthenticity

  @IsDefined()
  @IsEnum(eCheckResult)
  checkResult: eCheckResult

  @ValidateNested({ each: true })
  @Transform(({ obj }) => uRAuthenticityCheck.transformList(obj.checks), { toClassOnly: true })
  @IsArray()
  @Default([])
  checks: uRAuthenticityCheck[]

  /**
  * Create instance of RAuthenticityImageCheckListItem from plain object
  * @param {iRAuthenticityCheckGroup} input - plain object
  * @returns {RAuthenticityCheckGroup}
  */
  static fromPlain = (input: any): RAuthenticityCheckGroup =>
    plainToInstance(RAuthenticityCheckGroup, input)
}
