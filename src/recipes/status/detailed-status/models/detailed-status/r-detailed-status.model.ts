import { IsDefined, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

import { iROpticalStatusDetails, ROpticalStatusDetails } from './children'


export interface iRDetailedStatus {
  optical: iROpticalStatusDetails
}

export class RDetailedStatus implements iRDetailedStatus {
  @IsDefined()
  @Type(() => ROpticalStatusDetails)
  @ValidateNested()
  optical: ROpticalStatusDetails
}
