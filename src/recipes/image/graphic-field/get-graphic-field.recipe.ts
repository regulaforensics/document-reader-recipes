import {
  eGraphicFieldType,
  eLights,
  ImagesResultContainer,
  ProcessResponse
} from '@regulaforensics/document-reader-typings'

import { getImageDimensions } from '@/helpers'
import { RGraphicField } from './models'


const DEFAULT_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII='


/**
* Get graphic field
* @param {ProcessResponse} input - DocumentReader response
* @param {eGraphicFieldType} fieldType - Field type
* @param {true} allowDefaultImage - Allow default image if no image found
* @param {eLights[]} lights - Light indexes
* @returns {Promise<RGraphicField}
*/
export async function getGraphicField(
  input: ProcessResponse,
  fieldType: eGraphicFieldType,
  allowDefaultImage?: true,
  lights?: eLights[],
): Promise<RGraphicField>

/**
* Get graphic field
* @param {ProcessResponse} input - DocumentReader response
* @param {eGraphicFieldType} fieldType - Field type
* @param {false} allowDefaultImage - Allow default image if no image found
* @param {eLights[]} lights - Light indexes
* @returns {Promise<RGraphicField | undefined>}
*/
export async function getGraphicField(
  input: ProcessResponse,
  fieldType: eGraphicFieldType,
  allowDefaultImage?: false,
  lights?: eLights[],
): Promise<RGraphicField | undefined>

/**
* Get graphic field
* @param {ProcessResponse} input - DocumentReader response
* @param {eGraphicFieldType} fieldType - Field type
* @param {boolean} allowDefaultImage - Allow default image if no image found
* @param {eLights[]} lights - Light indexes
* @returns {Promise<RGraphicField | undefined>}
*/
export async function getGraphicField(
  input: ProcessResponse,
  fieldType: eGraphicFieldType,
  allowDefaultImage: boolean = true,
  lights?: eLights[],
): Promise<RGraphicField | undefined> {
  const result = new RGraphicField()
  result.width = 1
  result.height = 1
  result.src = DEFAULT_IMAGE

  const containers = ImagesResultContainer.fromProcessResponse(input, false)

  if (!containers.length) {
    return allowDefaultImage ? result : undefined
  }

  let candidate: string | undefined

  containers.forEach((container) => {
    if (candidate) {
      return
    }

    for (let i = 0; i < container.Images.fieldList.length; i++) {
      const current = container.Images.fieldList[i]

      if (current.fieldType !== fieldType) {
        continue
      }

      for (let j = 0; j < current.valueList.length; j++) {
        const image = current.valueList[j]

        if ((lights && lights.includes(image.lightIndex)) || (!lights)) {
          candidate = image.value

          break
        }
      }
    }
  })

  if (candidate) {
    result.src = `data:image/jpeg;base64,${candidate}`

    const dimensions = await getImageDimensions(result.src)

    result.width = dimensions.width
    result.height = dimensions.height
  } else if (!allowDefaultImage) {
    return undefined
  }

  return result
}
