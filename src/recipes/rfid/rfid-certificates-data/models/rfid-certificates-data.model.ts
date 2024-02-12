import { plainToClass } from 'class-transformer'
import { IsDefined, IsString, validateSync, ValidationError } from 'class-validator'

import { AllowPrimitives } from '@/types'


/**
* Rfid certificates data
*/
export interface iRRfidCertificatesData {
  /**
  * Public key algorithm
  * @type {string}
  */
  publicKeyAlgorithm: string

  /**
  * Signature algorithm
  * @type {string}
  */
  signatureAlgorithm: string

  /**
  * Issuer
  * @type {string}
  */
  issuer: string

  /**
  * Subject
  * @type {string}
  */
  subject: string

  /**
  * Valid from
  * @type {string}
  */
  validFrom: string
}

/**
* Rfid certificates data
*/
export class RRfidCertificatesData implements iRRfidCertificatesData {
  /**
  * Public key algorithm
  * @type {string}
  */
  @IsDefined()
  @IsString()
  publicKeyAlgorithm: string

  /**
  * Signature algorithm
  * @type {string}
  */
  @IsDefined()
  @IsString()
  signatureAlgorithm: string

  /**
  * Issuer
  * @type {string}
  */
  @IsDefined()
  @IsString()
  issuer: string

  /**
  * Subject
  * @type {string}
  */
  @IsDefined()
  @IsString()
  subject: string

  /**
  * Valid from
  * @type {string}
  */
  @IsDefined()
  @IsString()
  validFrom: string

  /**
  * Create instance of RRfidDataGroupStatus from plain object
  * @param {AllowPrimitives<iRRfidCertificatesData>} input - plain object
  * @returns {RRfidCertificatesData}
  */
  static fromPlain = (input: AllowPrimitives<iRRfidCertificatesData>): RRfidCertificatesData => plainToClass(RRfidCertificatesData, input)

  /**
  * Gets validation errors of RRfidDataGroupStatus
  * @param {RRfidCertificatesData} input - input data
  * @returns {ValidationError[]} - array of validation errors
  */
  static getValidationErrors = (input: RRfidCertificatesData): ValidationError[] => validateSync(input)
}
