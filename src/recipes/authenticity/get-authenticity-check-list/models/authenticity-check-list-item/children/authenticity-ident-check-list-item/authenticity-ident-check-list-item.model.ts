import { IsDefined, IsEnum, IsIn, IsNumber, IsString } from 'class-validator'

import {
  AuthenticityIdentCheckResultTypes,
  eCheckDiagnose,
  eCheckResult,
  eSecurityFeatureType,
  type tAuthenticityIdentCheckResultType,
} from '@regulaforensics/document-reader-typings'
import { plainToClass } from 'class-transformer'


/**
* Authenticity image check list item
*/
export interface iRAuthenticityIdentCheckListItem {
  /**
  * Feature type
  * @type {tAuthenticityIdentCheckResultType}
  */
  securityFeatureType: tAuthenticityIdentCheckResultType

  /**
  * Identity percent of the etalon and sample image
  * @type {number}
  */
  similarity: number

  /**
  * Element with which errors are checked
  * @type {eSecurityFeatureType}
  */
  type: eSecurityFeatureType;

  /**
  * Located image fragment
  * @type {string}
  */
  image: string

  /**
  * Reference image
  * @type {string}
  */
  referenceImage: string

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
* Authenticity image check list item
*/
export class RAuthenticityIdentCheckListItem implements iRAuthenticityIdentCheckListItem {
  /**
  * Feature type
  * @type {tAuthenticityIdentCheckResultType}
  */
  @IsDefined()
  @IsIn(AuthenticityIdentCheckResultTypes)
  securityFeatureType: tAuthenticityIdentCheckResultType

  /**
  * Identity percent of the etalon and sample image
  * @type {number}
  */
  @IsDefined()
  @IsNumber()
  similarity: number

  /**
  * Element with which errors are checked
  * @type {eSecurityFeatureType}
  */
  @IsDefined()
  @IsEnum(eSecurityFeatureType)
  type: eSecurityFeatureType;

  /**
  * Located image fragment
  * @type {string}
  */
  @IsDefined()
  @IsString()
  image: string

  /**
  * Reference image
  * @type {string}
  */
  @IsDefined()
  @IsString()
  referenceImage: string

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
  * Create instance of RAuthenticityImageCheckListItem from plain object
  * @param {iRAuthenticityIdentCheckListItem} input - plain object
  * @returns {RAuthenticityIdentCheckListItem}
  */
  static fromPlain = (input: iRAuthenticityIdentCheckListItem): RAuthenticityIdentCheckListItem =>
    plainToClass(RAuthenticityIdentCheckListItem, input)
}
