import { eVisualFieldType, ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RTextFieldValue } from './models'
import { getTextFieldValue } from './get-text-field-value.recipe'


export function getDocumentDateOfExpiry(input: ProcessResponse, allowDefault?: true): RTextFieldValue;
export function getDocumentDateOfExpiry(input: ProcessResponse, allowDefault?: false): RTextFieldValue | undefined;
export function getDocumentDateOfExpiry(input: ProcessResponse, allowDefault: boolean = true): RTextFieldValue | undefined {
  if (allowDefault) {
    return getTextFieldValue(input, eVisualFieldType.DATE_OF_EXPIRY, true)
  }
  return getTextFieldValue(input, eVisualFieldType.DATE_OF_EXPIRY, false)
}
