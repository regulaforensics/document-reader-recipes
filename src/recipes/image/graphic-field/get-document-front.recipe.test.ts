import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/0.json'
import { RGraphicField } from './models'
import { getDocumentFront } from './get-document-front.recipe'


describe('getDocumentFront', () => {
  let result: RGraphicField
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should be defined', async () => {
    result = await getDocumentFront(docReaderResponse)
    expect(result).toBeDefined()
  })

  test('should return valid image', () => {
    expect(result.src).toMatch(/^data:image\/jpeg;base64/)
  })

  test('should return valid model', () => {
    const isValid = RGraphicField.isValid(result)
    expect(isValid).toBeTruthy()
  })
})
