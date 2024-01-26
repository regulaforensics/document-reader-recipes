import { eVisualFieldType, ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RTextFieldValue } from './models'
import { getTextFieldValue } from './get-text-field-value.recipe'


/**
* Returns document issuing state name
* @param {ProcessResponse} input
* @param {true} allowDefault
* @returns {RTextFieldValue}
*/
export function getDocumentIssuingStateName(input: ProcessResponse, allowDefault?: true): RTextFieldValue;

/**
* Returns document issuing state name
* @param {ProcessResponse} input
* @param {false} allowDefault
* @returns {RTextFieldValue | undefined}
*/
export function getDocumentIssuingStateName(input: ProcessResponse, allowDefault?: false): RTextFieldValue | undefined;

/**
* Returns document issuing state name
* @param {ProcessResponse} input
* @param {boolean} allowDefault
* @returns {RTextFieldValue | undefined}
*/
export function getDocumentIssuingStateName(input: ProcessResponse, allowDefault: boolean = true): RTextFieldValue | undefined {
  if (allowDefault) {
    return getTextFieldValue(input, eVisualFieldType.ISSUING_STATE_NAME, true)
  }
  return getTextFieldValue(input, eVisualFieldType.ISSUING_STATE_NAME, false)
}
