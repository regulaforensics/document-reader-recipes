import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/0.json'
import { getDocumentFront } from './get-document-front.recipe'


describe('getDocumentFront', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should return valid image', async () => {
    const result = await getDocumentFront(docReaderResponse)

    expect(result.src).toMatch(/^data:image\/jpeg;base64/)
    expect(result).toBeDefined()
  })
})
