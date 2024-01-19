import {
  eCheckResult,
  eLCID,
  eVisualFieldType,
  ProcessResponse,
  TextResultContainer
} from '@regulaforensics/document-reader-typings'
import { firstBy } from 'thenby'

import { RNameSurname } from './models'


const SCORE_SHIFT = 3

/**
* Get name, surname and LCID from ProcessResponse
* @param {ProcessResponse} input - ProcessResponse
* @param {string} unknownValue - value to return if name and surname not found
* @returns {RNameSurname}
*/
export const getNameSurname = (input: ProcessResponse, unknownValue: string = 'UNKNOWN'): RNameSurname => {
  const result: RNameSurname = new RNameSurname()

  const textContainer: TextResultContainer | undefined = input.ContainerList.List
    .find((i): i is TextResultContainer => i instanceof TextResultContainer)

  if (!textContainer) {
    return RNameSurname.fromPlain({
      value: unknownValue,
      checkResult: eCheckResult.ERROR,
      lcid: eLCID.ENGLISH_US
    })
  }

  const candidates: {
    score: number
    lcid: eLCID
    checkResult: eCheckResult
    value: string
  }[] = []

  textContainer.Text.fieldList
    .filter((i) => i.fieldType === eVisualFieldType.SURNAME_AND_GIVEN_NAMES)
    .forEach((field) => {
      if (!field.value) {
        return
      }

      let score = 1 // SURNAME_AND_GIVEN_NAMES is preferred, that's why the score is initially higher

      score = field.status === eCheckResult.OK ? score + SCORE_SHIFT : score - SCORE_SHIFT
      score = typeof field.lcid !== 'undefined' ? score + SCORE_SHIFT : score - SCORE_SHIFT
      score = field.lcid === eLCID.LATIN ? score + SCORE_SHIFT : score - SCORE_SHIFT

      candidates.push({
        score,
        lcid: field.lcid,
        checkResult: field.status,
        value: field.value
      })
    })

    //try to find name
    textContainer.Text.fieldList
      .filter((i) => i.fieldType === eVisualFieldType.GIVEN_NAMES)
      .forEach((field) => {
        // try to find surname pair
        const surname = textContainer.Text.fieldList
          .find((i) => i.fieldType === eVisualFieldType.SURNAME && i.lcid === field.lcid && i.status === field.status)

        if (!surname) {
          return
        }

        let score = 0

        score = field.status === eCheckResult.OK ? score + SCORE_SHIFT : score - SCORE_SHIFT
        score = typeof field.lcid !== 'undefined' ? score + SCORE_SHIFT : score - SCORE_SHIFT
        score = field.lcid === eLCID.LATIN ? score + SCORE_SHIFT : score - SCORE_SHIFT

        candidates.push({
          score,
          lcid: field.lcid,
          checkResult: field.status,
          value: `${surname.value} ${field.value}`
        })
      })

  const candidatesByScore = candidates.sort(firstBy(i => i.score, 'desc'))

  if (candidatesByScore.length) {
    const selected = candidatesByScore[0]

    result.checkResult = selected.checkResult
    result.value = selected.value
    result.lcid = selected.lcid

    return result
  }

  result.checkResult = eCheckResult.ERROR
  result.value = unknownValue

  return result
}
