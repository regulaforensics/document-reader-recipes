import { eGraphicFieldType, ImagesResultContainer, ProcessResponse } from '@regulaforensics/document-reader-typings'

import { getImageDimensions } from '@/helpers'
import { RDocumentImage, RDocumentImagePage } from './models'


export const getDocumentImage = async (input: ProcessResponse): Promise<RDocumentImage[]> => {
  const result: RDocumentImage[] = []

    const container: ImagesResultContainer | undefined = input.ContainerList.List
      .find((i): i is ImagesResultContainer => i instanceof ImagesResultContainer)

    if (!container) {
      return result
    }

    for (let i = 0; i < container.Images.fieldList.length; i++){
      const field = container.Images.fieldList[i]

      if (field.fieldType !== eGraphicFieldType.DOCUMENT_FRONT) {
        continue
      }

      const { fieldName } = field

      for (let j = 0; j < field.valueList.length; j++) {
        const page = field.valueList[j]

        const { lightIndex, pageIndex, value } = page

        let index = result.findIndex((i) => i.light === lightIndex)

        if (index < 0) {
          const current = new RDocumentImage()

          current.name = fieldName
          current.light = lightIndex
          current.pages = []

          index = result.push(current) - 1
        }

        const src = `data:image/jpeg;base64,${value}`
        const dimensions = await getImageDimensions(src)

        const current = new RDocumentImagePage()
        current.pageIndex = pageIndex
        current.src = src
        current.width = dimensions.width
        current.height = dimensions.height

        result[index].pages.push(current)
      }
    }

    return result
}
