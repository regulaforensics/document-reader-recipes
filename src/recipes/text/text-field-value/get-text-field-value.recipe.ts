import { eVisualFieldType, ProcessResponse, TextResultContainer } from '@regulaforensics/document-reader-typings'

import { RTextFieldValue } from './models'


export function getTextFieldValue(input: ProcessResponse, fieldType: eVisualFieldType): RTextFieldValue[] {
  const containers = TextResultContainer.fromProcessResponse(input)
  const result: RTextFieldValue[] = []

  for (let i = 0; i < containers.length; i++) {
    const container = containers[i]

    container.Text.fieldList.forEach((field) => {
      if (field.fieldType !== fieldType) {
        return
      }

      result.push(RTextFieldValue.fromPlain({
        value: field.value,
        status: field.status,
        lcid: field.lcid,
      }))
    })
  }

  return result.sort((a, b) => a.lcid - b.lcid)
}
