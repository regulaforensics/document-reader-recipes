import { eVisualFieldType, ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RTextFieldValue } from './models'
import { getTextFieldValue } from './get-text-field-value.recipe'


export function getDocumentOwnerNationalityCode(input: ProcessResponse): RTextFieldValue[] {
  return getTextFieldValue(input, eVisualFieldType.NATIONALITY_CODE)
}
