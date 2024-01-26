import { eVisualFieldType, ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RTextFieldValue } from './models'
import { getTextFieldValue } from './get-text-field-value.recipe'


export function getDocumentOwnerNationalityCode(input: ProcessResponse, allowDefault?: true): RTextFieldValue;
export function getDocumentOwnerNationalityCode(input: ProcessResponse, allowDefault?: false): RTextFieldValue | undefined;
export function getDocumentOwnerNationalityCode(input: ProcessResponse, allowDefault: boolean = true): RTextFieldValue | undefined {
  if (allowDefault) {
    return getTextFieldValue(input, eVisualFieldType.NATIONALITY_CODE, true)
  }
  return getTextFieldValue(input, eVisualFieldType.NATIONALITY_CODE, false)
}
