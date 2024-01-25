import { IsDefined, IsEnum } from 'class-validator'
import { eCheckResult } from '@regulaforensics/document-reader-typings'

import { eOpticalStatusField } from './consts'
import { Expose } from 'class-transformer'


/**
* Summary of optical check results
*/
export interface iRDetailedStatusOptical {
  /**
  * Overall result of optical check
  * @type {eCheckResult}
  */
  [eOpticalStatusField.OVERALL]: eCheckResult

  /**
  * The check status if document type was recognized or not.
  * @type {eCheckResult}
  */
  [eOpticalStatusField.DOC_TYPE]: eCheckResult

  /**
  * The document validity period verification status.
  * @type {eCheckResult}
  */
  [eOpticalStatusField.EXPIRY]: eCheckResult

  /**
  * The input images quality verification status.
  * @type {eCheckResult}
  */
  [eOpticalStatusField.IMAGE_QA]: eCheckResult

  /**
  * MRZ verification: values validity, dates, checkdigits verification.
  * @type {eCheckResult}
  */
  [eOpticalStatusField.MRZ]: eCheckResult

  /**
  * The authenticity verification status
  * @type {eCheckResult}
  */
  [eOpticalStatusField.SECURITY]: eCheckResult

  /**
  * Text fields valitity: values validity for specific fields, cross-comparison of values from different sources,
  * dates & checkdigits verification.
  * @type {eCheckResult}
  */
  [eOpticalStatusField.TEXT]: eCheckResult
}

/**
* Summary of optical check results
*/
export class RDetailedStatusOptical implements iRDetailedStatusOptical {
  /**
  * Overall result of optical check
  * @type {eCheckResult}
  */
  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  [eOpticalStatusField.OVERALL]: eCheckResult

  /**
  * The check status if document type was recognized or not.
  * @type {eCheckResult}
  */
  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  [eOpticalStatusField.DOC_TYPE]: eCheckResult

  /**
  * The document validity period verification status.
  * @type {eCheckResult}
  */
  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  [eOpticalStatusField.EXPIRY]: eCheckResult

  /**
  * The input images quality verification status.
  * @type {eCheckResult}
  */
  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  [eOpticalStatusField.IMAGE_QA]: eCheckResult

  /**
  * MRZ verification: values validity, dates, checkdigits verification.
  * @type {eCheckResult}
  */
  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  [eOpticalStatusField.MRZ]: eCheckResult

  /**
  * The authenticity verification status
  * @type {eCheckResult}
  */
  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  [eOpticalStatusField.SECURITY]: eCheckResult

  /**
  * Text fields valitity: values validity for specific fields, cross-comparison of values from different sources,
  * dates & checkdigits verification.
  * @type {eCheckResult}
  */
  @Expose()
  @IsDefined()
  @IsEnum(eCheckResult)
  [eOpticalStatusField.TEXT]: eCheckResult
}
