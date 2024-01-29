import { eVisualFieldType, ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RTextFieldValue } from './models'
import { getTextFieldValue } from './get-text-field-value.recipe'


/**
* Returns document number field value
* @param {ProcessResponse} input
* @param {true} allowDefault
* @returns {RTextFieldValue}
*/
export function getDocumentNumber(input: ProcessResponse, allowDefault?: true): RTextFieldValue;

/**
* Returns document number field value
* @param {ProcessResponse} input
* @param {false} allowDefault
* @returns {RTextFieldValue | undefined}
*/
export function getDocumentNumber(input: ProcessResponse, allowDefault?: false): RTextFieldValue | undefined;

/**
* Returns document number field value
* @param {ProcessResponse} input
* @param {boolean} allowDefault
* @returns {RTextFieldValue | undefined}
*/
export function getDocumentNumber(input: ProcessResponse, allowDefault: boolean = true): RTextFieldValue | undefined {
  if (allowDefault) {
    return getTextFieldValue(input, eVisualFieldType.DOCUMENT_NUMBER, true)
  }
  return getTextFieldValue(input, eVisualFieldType.DOCUMENT_NUMBER, false)
}
