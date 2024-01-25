import { IsDefined, IsEnum } from 'class-validator'
import { eCheckResult, eImageQualityCheckType } from '@regulaforensics/document-reader-typings'


/**
* Short version of image quality check
*/
export interface iRImageQualityCheck {
  /**
  * Check type
  * @type {eImageQualityCheckType}
  */
  checkType: eImageQualityCheckType

  /**
  * Check result
  * @type {eCheckResult}
  */
  checkResult: eCheckResult
}

/**
* Short version of image quality check
*/
export class RImageQualityCheck implements iRImageQualityCheck {
  /**
  * Check type
  * @type {eImageQualityCheckType}
  */
  @IsDefined()
  @IsEnum(eImageQualityCheckType)
  checkType: eImageQualityCheckType

  /**
  * Check result
  * @type {eCheckResult}
  */
  @IsDefined()
  @IsEnum(eCheckResult)
  checkResult: eCheckResult
}
