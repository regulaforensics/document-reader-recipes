import {
  eCheckResult,
  eLCID,
  eVisualFieldType,
  ProcessResponse,
  TextResultContainer
} from '@regulaforensics/document-reader-typings'

import { RNameSurname } from './models'


/**
* Get name, surname and LCID from ProcessResponse
* @param {ProcessResponse} input - ProcessResponse
* @param {string} unknownValue - value to return if name and surname not found
* @returns {RNameSurname}
*/
export const getNameSurname = (input: ProcessResponse, unknownValue: string = 'UNKNOWN'): RNameSurname => {
  const containers = TextResultContainer.fromProcessResponse(input)
  const defaultValue = RNameSurname.fromPlain({
    value: unknownValue,
    checkResult: eCheckResult.ERROR,
    lcid: eLCID.LATIN
  })

  if (!containers.length) {
    return defaultValue
  }

  for (let i = 0; i < containers.length; i++) {
    const container = containers[i]
    const { Text } = container
    const latinIndex = Text.fieldList.findIndex((i) => i.lcid === eLCID.LATIN && i.fieldType === eVisualFieldType.SURNAME_AND_GIVEN_NAMES)

    if (latinIndex !== -1) {
      const field = Text.fieldList[latinIndex]

      return RNameSurname.fromPlain({
        value: field.value,
        checkResult: field.status,
        lcid: field.lcid
      })
    }
  }

  for (let i = 0; i < containers.length; i++) {
    const container = containers[i]
    const { Text } = container

    for (let j = 0; j < Text.fieldList.length; j++) {
      const field = Text.fieldList[j]

      if (field.fieldType === eVisualFieldType.SURNAME_AND_GIVEN_NAMES && field.value) {
        return RNameSurname.fromPlain({
          value: field.value,
          checkResult: field.status,
          lcid: field.lcid
        })
      }
    }
  }

  return defaultValue
}
