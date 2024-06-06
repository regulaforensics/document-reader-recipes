import { eVisualFieldType, ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RTextFieldValue } from './models'
import { getTextFieldValue } from './get-text-field-value.recipe'


/**
* Returns document date of expiry
* @param {ProcessResponse} input
* @returns {RTextFieldValue[]}
*/
export function getDocumentDateOfExpiry(input: ProcessResponse): RTextFieldValue[] {
  return getTextFieldValue(input, eVisualFieldType.DATE_OF_EXPIRY)
}
