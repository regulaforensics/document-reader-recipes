import { eGraphicFieldType, eLights, ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/0.json'
import { getGraphicField } from './get-graphic-field.recipe'


describe('getGraphicField', async () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)
  const result = await getGraphicField(docReaderResponse, eGraphicFieldType.DOCUMENT_FRONT)

  test('should be defined', async () => {
    expect(result).toBeDefined()
  })

  test('should return valid image', async () => {
    expect(result.src).toMatch(/^data:image\/jpeg;base64/)
  })

  test('should be able to return default image', async () => {
    const result = await getGraphicField(docReaderResponse, eGraphicFieldType.DOCUMENT_FRONT, eLights.HOLO)

    expect(result.src).toMatch(/^data:image\/png;base64/)
  })

  test('should return undefined if no image found', async () => {
    const result = await getGraphicField(docReaderResponse, eGraphicFieldType.PORTRAIT, eLights.HOLO, false)

    expect(result).toBeUndefined()
  })
})
