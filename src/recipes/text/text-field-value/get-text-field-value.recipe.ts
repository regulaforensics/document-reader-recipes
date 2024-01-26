import {
  eCheckResult,
  eVisualFieldType,
  ProcessResponse,
  TextResultContainer
} from '@regulaforensics/document-reader-typings'

import { RTextFieldValue } from './models'


export function getTextFieldValue(input: ProcessResponse, fieldType: eVisualFieldType, allowDefault?: true): RTextFieldValue;
export function getTextFieldValue(input: ProcessResponse, fieldType: eVisualFieldType, allowDefault?: false): RTextFieldValue | undefined;
export function getTextFieldValue(input: ProcessResponse, fieldType: eVisualFieldType, allowDefault: boolean = true): RTextFieldValue | undefined {
  const containers = TextResultContainer.fromProcessResponse(input)

  for (let i = 0; i < containers.length; i++) {
    const container = containers[i]
    const field = container.Text.fieldList.find((i) => i.fieldType === fieldType)

    if (field) {
      return RTextFieldValue.fromPlain({
        value: field.value,
        status: field.status,
      })
    }
  }

  return allowDefault
    ? RTextFieldValue.fromPlain({ value: '', status: eCheckResult.WAS_NOT_DONE })
    : undefined
}
