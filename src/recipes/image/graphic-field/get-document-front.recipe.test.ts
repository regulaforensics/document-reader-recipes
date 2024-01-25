import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/0.json'
import { getDocumentFront } from './get-document-front.recipe'


describe('getDocumentFront', async () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)
  const result = await getDocumentFront(docReaderResponse)

  test('should be defined', () => {
    expect(result).toBeDefined()
  })

  test('should return valid image', () => {
    expect(result.src).toMatch(/^data:image\/jpeg;base64/)
  })
})
