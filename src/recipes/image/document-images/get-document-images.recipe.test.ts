import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/2.json'
import { getDocumentImages } from './get-document-images.recipe'


describe('getDocumentImage', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should return non-empty array of images', async () => {
    const result = await getDocumentImages(docReaderResponse)

    expect(result.length).toBeGreaterThan(0)
  })
})
