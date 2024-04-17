import { plainToClass } from 'class-transformer'
import { IsDefined, IsString, validateSync, ValidationError } from 'class-validator'

import { AllowPrimitives } from '@/types'


/**
* Rfid certificates data
*/
export interface iRRfidCertificate {
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

  /**
  * Valid to
  * @type {string}
  */
  validTo: string
}

/**
* Rfid certificates data
*/
export class RRfidCertificate implements iRRfidCertificate {
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
  * Valid from
  * @type {string}
  */
  @IsDefined()
  @IsString()
  validTo: string

  /**
  * Create instance of RRfidDataGroupStatus from plain object
  * @param {AllowPrimitives<iRRfidCertificate>} input - plain object
  * @returns {RRfidCertificate}
  */
  static fromPlain = (input: AllowPrimitives<iRRfidCertificate>): RRfidCertificate => plainToClass(RRfidCertificate, input)

  /**
  * Gets validation errors of RRfidDataGroupStatus
  * @param {RRfidCertificate} input - input data
  * @returns {ValidationError[]} - array of validation errors
  */
  static getValidationErrors = (input: RRfidCertificate): ValidationError[] => validateSync(input)
}
