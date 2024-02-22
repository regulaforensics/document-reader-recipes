import {
  eGraphicFieldType,
  ImageField,
  ImagesResultContainer,
  ProcessResponse
} from '@regulaforensics/document-reader-typings'

import { getImageDimensions } from '@/helpers'
import { RDocumentImage, RDocumentImagePage } from './models'


/**
* Get document images
* @param {ProcessResponse} input
* @param {eGraphicFieldType[]|undefined} fieldTypes
* @returns {Promise<RDocumentImage[]>}
*/
export const getDocumentImages = async (
  input: ProcessResponse,
  fieldTypes?: eGraphicFieldType[]
): Promise<RDocumentImage[]> => {
  const result: RDocumentImage[] = []

  const containers = ImagesResultContainer.fromProcessResponse(input)

  if (!containers.length) {
    return result
  }

  const imageFields: ImageField[] = ImageField.fromContainers(containers, fieldTypes)

  for (let i = 0; i < imageFields.length; i++) {
    const field = imageFields[i]
    const { fieldName } = field

    for (let j = 0; j < field.valueList.length; j++) {
      const page = field.valueList[j]

      const { lightIndex, pageIndex, value } = page

      let index = result.findIndex((i) => i.light === lightIndex && i.fieldType === field.fieldType)

      if (index < 0) {
        const current = new RDocumentImage()

        current.name = fieldName
        current.fieldType = field.fieldType
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
