import { eCheckResult, ProcessResponse, TextResultContainer } from '@regulaforensics/document-reader-typings'

import { RTextData, RTextDataSource, RTextDataComparison } from './models'


export const getTextData = (input: ProcessResponse): RTextData[] => {
  const result: RTextData[] = []
  const containers = TextResultContainer.fromProcessResponse(input)

  if (!containers.length) {
    return result
  }

  containers.forEach((container) => {
    const availableSources = container.Text.availableSourceList.map(i => i.source)

    container.Text.fieldList.forEach((field) => {
      const current = new RTextData()

      current.type = field.fieldType
      current.value = field.value
      current.lcid = field.lcid
      current.checkResult = field.status
      current.comparisonList = field.comparisonList?.map((i) => {
        const current =  new RTextDataComparison()

        current.sourceLeft = i.sourceLeft
        current.sourceRight = i.sourceRight
        current.status = i.status

        return current
      }) || []

      current.bySource = []

      availableSources.forEach((source) => {
        const validity = field.validityList.find(i => i.source === source)
        const currentSource = new RTextDataSource()
        const currentSourceValue = field.valueList.find((i) => i.source === source)

        currentSource.checkResult = validity?.status ?? eCheckResult.WAS_NOT_DONE
        currentSource.source = source
        currentSource.value = currentSourceValue?.value ?? ''
        currentSource.pageIndex = currentSourceValue?.pageIndex ?? 0
        currentSource.probability = currentSourceValue?.probability ?? 0

        current.bySource.push(currentSource)
      })

      if (current.bySource.length) {
        result.push(current)
      }
    })
  })

  return result
}
