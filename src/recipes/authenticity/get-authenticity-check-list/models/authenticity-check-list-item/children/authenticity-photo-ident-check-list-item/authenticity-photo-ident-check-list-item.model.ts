import { IsDefined, IsEnum, IsIn, IsString } from 'class-validator'
import { plainToClass } from 'class-transformer'
import {
  AuthenticityPhotoIdentCheckResultTypes,
  eCheckDiagnose,
  eCheckResult,
  type tAuthenticityPhotoIdentCheckResultType
} from '@regulaforensics/document-reader-typings'


/**
* Authenticity IPI check list item
*/
export interface iRAuthenticityPhotoIdentCheckListItem {
  /**
  * Feature type
  * @type {tAuthenticityPhotoIdentCheckResultType}
  */
  securityFeatureType: tAuthenticityPhotoIdentCheckResultType

  /**
  * Located image fragment
  * @type {string}
  */
  image: string

  /**
  * Element with which errors are checked
  * @type {eCheckDiagnose}
  */
  diagnose: eCheckDiagnose

  /**
  * Overall checking result
  * @type {eCheckResult}
  */
  checkResult: eCheckResult
}

/**
* Authenticity IPI check list item
*/
export class RAuthenticityPhotoIdentCheckListItem implements iRAuthenticityPhotoIdentCheckListItem {
  /**
  * Feature type
  * @type {tAuthenticityPhotoIdentCheckResultType}
  */
  @IsDefined()
  @IsIn(AuthenticityPhotoIdentCheckResultTypes)
  securityFeatureType: tAuthenticityPhotoIdentCheckResultType

  /**
  * Located image fragment
  * @type {string}
  */
  @IsDefined()
  @IsString()
  image: string

  /**
  * Element with which errors are checked
  * @type {eCheckDiagnose}
  */
  @IsDefined()
  @IsEnum(eCheckDiagnose)
  diagnose: eCheckDiagnose

  /**
  * Overall checking result
  * @type {eCheckResult}
  */
  @IsDefined()
  @IsEnum(eCheckResult)
  checkResult: eCheckResult

  /**
  * Create instance of RAuthenticityIpiCheckListItem from plain object
  * @param {iRAuthenticityPhotoIdentCheckListItem} input - plain object
  * @returns {RAuthenticityPhotoIdentCheckListItem}
  */
  static fromPlain = (input: iRAuthenticityPhotoIdentCheckListItem): RAuthenticityPhotoIdentCheckListItem =>
    plainToClass(RAuthenticityPhotoIdentCheckListItem, input)
}
