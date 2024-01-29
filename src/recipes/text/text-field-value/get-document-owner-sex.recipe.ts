import { eVisualFieldType, ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RTextFieldValue } from './models'
import { getTextFieldValue } from './get-text-field-value.recipe'


export function getDocumentOwnerSex(input: ProcessResponse, allowDefault?: true): RTextFieldValue;
export function getDocumentOwnerSex(input: ProcessResponse, allowDefault?: false): RTextFieldValue | undefined;
export function getDocumentOwnerSex(input: ProcessResponse, allowDefault: boolean = true): RTextFieldValue | undefined {
  if (allowDefault) {
    return getTextFieldValue(input, eVisualFieldType.SEX, true)
  }
  return getTextFieldValue(input, eVisualFieldType.SEX, false)
}
