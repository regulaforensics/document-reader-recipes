import { eGraphicFieldType, eLights, ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/0.json'
import { RGraphicField } from './models'
import { getGraphicField } from './get-graphic-field.recipe'


describe('getGraphicField', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)
  let result: RGraphicField

  test('should be defined', async () => {
    result = await getGraphicField(docReaderResponse, eGraphicFieldType.DOCUMENT_FRONT)

    expect(result).toBeDefined()
  })

  test('should return valid image', async () => {
    expect(result.src).toMatch(/^data:image\/jpeg;base64/)
  })

  test('should be able to return default image', async () => {
    const result = await getGraphicField(docReaderResponse, eGraphicFieldType.DOCUMENT_FRONT, true, [eLights.HOLO])

    expect(result.src).toMatch(/^data:image\/png;base64/)
  })

  test('should return undefined if no image found', async () => {
    const result = await getGraphicField(docReaderResponse, eGraphicFieldType.PORTRAIT, false, [eLights.HOLO])

    expect(result).toBeUndefined()
  })

  test('should return valid model', async () => {
    const isValid = RGraphicField.isValid(result)

    expect(isValid).toBe(true)
  })
})
