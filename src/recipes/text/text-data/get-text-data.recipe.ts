import { ProcessResponse, TextResultContainer } from '@regulaforensics/document-reader-typings'

import { RTextData, RTextDataSource } from './models'


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

      current.name = field.fieldName
      current.value = field.value
      current.lcid = field.lcid
      current.checkResult = field.status

      current.bySource = []

      availableSources.forEach((source) => {
        const validity = field.validityList.find(i => i.source === source)

        if (validity) {
          const currentSource = new RTextDataSource()
          const currentSourceValue = field.valueList.find((i) => i.source === source)

          currentSource.checkResult = validity.status
          currentSource.source = source
          currentSource.value = currentSourceValue?.value || ''

          current.bySource.push(currentSource)
        }
      })

      if (current.bySource.length) {
        result.push(current)
      }
    })
  })

  return result
}
