import { eVisualFieldType, ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RTextFieldValue } from './models'
import { getTextFieldValue } from './get-text-field-value.recipe'


export function getDocumentOwnerAge(input: ProcessResponse, allowDefault?: true): RTextFieldValue;
export function getDocumentOwnerAge(input: ProcessResponse, allowDefault?: false): RTextFieldValue | undefined;
export function getDocumentOwnerAge(input: ProcessResponse, allowDefault: boolean = true): RTextFieldValue | undefined {
  if (allowDefault) {
    return getTextFieldValue(input, eVisualFieldType.AGE, true)
  }
  return getTextFieldValue(input, eVisualFieldType.AGE, false)
}
