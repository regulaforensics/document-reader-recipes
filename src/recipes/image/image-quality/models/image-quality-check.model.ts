import { IsDefined, IsEnum } from 'class-validator'
import { eCheckResult, eImageQualityCheckType } from '@regulaforensics/document-reader-typings'


export interface iRImageQualityCheck {
  checkType: eImageQualityCheckType
  checkResult: eCheckResult
}

export class RImageQualityCheck implements iRImageQualityCheck {
  @IsDefined()
  @IsEnum(eImageQualityCheckType)
  checkType: eImageQualityCheckType

  @IsDefined()
  @IsEnum(eCheckResult)
  checkResult: eCheckResult
}
