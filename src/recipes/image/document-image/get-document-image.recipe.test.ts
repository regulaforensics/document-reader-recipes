import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/0.json'
import { getDocumentImage } from './get-document-image.recipe'


describe('getDocumentImage', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should return non-empty array of images', async () => {
    const result = await getDocumentImage(docReaderResponse)

    expect(result.length).toBeGreaterThan(0)
  })
})
