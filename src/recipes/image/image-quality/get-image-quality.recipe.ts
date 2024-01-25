import { ImageQualityCheckListContainer, ProcessResponse } from '@regulaforensics/document-reader-typings'
import { firstBy } from 'thenby'

import { RImageQuality, RImageQualityCheck } from './models'


export const getImageQuality = (input: ProcessResponse): RImageQuality[] => {
  const result: RImageQuality[] = []

  const containers = ImageQualityCheckListContainer.fromProcessResponse(input)
    .sort(firstBy((i) => i.page_idx))

  containers.forEach((container) => {
    const current = new RImageQuality()

    current.pageIndex = container.page_idx || 1
    current.checks = []

    container.ImageQualityCheckList.List.forEach((check) => {
      if (!check.result || !check.type) {
        return
      }

      const currentCheck = new RImageQualityCheck()
      currentCheck.checkResult = check.result
      currentCheck.checkType = check.type

      current.checks.push(currentCheck)
    })

    result.push(current)
  })

  return result.filter((i) => i.checks.length)
}
