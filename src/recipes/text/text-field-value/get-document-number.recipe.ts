import { eVisualFieldType, ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RTextFieldValue } from './models'
import { getTextFieldValue } from './get-text-field-value.recipe'


export function getDocumentNumber(input: ProcessResponse, allowDefault?: true): RTextFieldValue;
export function getDocumentNumber(input: ProcessResponse, allowDefault?: false): RTextFieldValue | undefined;
export function getDocumentNumber(input: ProcessResponse, allowDefault: boolean = true): RTextFieldValue | undefined {
  if (allowDefault) {
    return getTextFieldValue(input, eVisualFieldType.DOCUMENT_NUMBER, true)
  }
  return getTextFieldValue(input, eVisualFieldType.DOCUMENT_NUMBER, false)
}
