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
  const candidates: RNameSurname[] = []

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

    const latinIndexSurname = Text.fieldList.findIndex((i) => i.lcid === eLCID.LATIN && i.fieldType === eVisualFieldType.SURNAME)
    const latinIndexName = Text.fieldList.findIndex((i) => i.lcid === eLCID.LATIN && i.fieldType === eVisualFieldType.GIVEN_NAMES)

    if (latinIndexSurname !== -1 && latinIndexName !== -1) {
      const surname = Text.fieldList[latinIndexSurname]
      const name = Text.fieldList[latinIndexName]

      candidates.push(RNameSurname.fromPlain({
        value: `${surname.value} ${name.value}`,
        checkResult: surname.status,
        lcid: surname.lcid
      }))
    }
  }

  if (candidates.length) {
    return candidates[0]
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

      if (field.fieldType === eVisualFieldType.SURNAME && field.value) {
        const nameField = Text.fieldList.find((i) => i.fieldType === eVisualFieldType.GIVEN_NAMES && i.lcid === field.lcid)

        if (nameField) {
          candidates.push(RNameSurname.fromPlain({
            value: `${field.value} ${nameField.value}`,
            checkResult: field.status,
            lcid: field.lcid
          }))
        }
      }
    }
  }

  const okCandidates = candidates.filter((i) => i.checkResult === eCheckResult.OK)

  if (okCandidates.length) {
    return okCandidates[0]
  }

  if (candidates.length) {
    return candidates[0]
  }

  return defaultValue
}
