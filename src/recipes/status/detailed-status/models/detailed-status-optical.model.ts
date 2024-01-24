import { IsDefined, IsEnum } from 'class-validator'
import { eCheckResult } from '@regulaforensics/document-reader-typings'

import { eOpticalStatusField } from './consts'
import { Expose } from 'class-transformer'


export interface iRDetailedStatusOptical {
  [eOpticalStatusField.OVERALL]: eCheckResult
  [eOpticalStatusField.DOC_TYPE]: eCheckResult
  [eOpticalStatusField.EXPIRY]: eCheckResult
  [eOpticalStatusField.IMAGE_QA]: eCheckResult
  [eOpticalStatusField.MRZ]: eCheckResult
  [eOpticalStatusField.SECURITY]: eCheckResult
  [eOpticalStatusField.TEXT]: eCheckResult
}

export class RDetailedStatusOptical implements iRDetailedStatusOptical {
  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  [eOpticalStatusField.OVERALL]: eCheckResult

  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  [eOpticalStatusField.DOC_TYPE]: eCheckResult

  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  [eOpticalStatusField.EXPIRY]: eCheckResult

  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  [eOpticalStatusField.IMAGE_QA]: eCheckResult

  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  [eOpticalStatusField.MRZ]: eCheckResult

  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  [eOpticalStatusField.SECURITY]: eCheckResult

  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  [eOpticalStatusField.TEXT]: eCheckResult
}
