import { eAuthenticity, eCheckResult } from '@regulaforensics/document-reader-typings'


export abstract class aAuthenticityCheck {
  /**
  * Check type
  * @type {eAuthenticity}
  */
  checkType: eAuthenticity

  /**
  * Overall checking result
  * @type {eCheckResult}
  */
  checkResult: eCheckResult
}
