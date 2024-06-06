import { eVisualFieldType, ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RTextFieldValue } from './models'
import { getTextFieldValue } from './get-text-field-value.recipe'


/**
* Returns document number field value
* @param {ProcessResponse} input
* @returns {RTextFieldValue[]}
*/
export function getDocumentNumber(input: ProcessResponse): RTextFieldValue[] {
  return getTextFieldValue(input, eVisualFieldType.DOCUMENT_NUMBER)
}
