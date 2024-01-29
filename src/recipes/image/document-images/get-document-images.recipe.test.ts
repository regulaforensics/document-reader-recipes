import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/2.json'
import { RDocumentImage } from './models'
import { getDocumentImages } from './get-document-images.recipe'


describe('getDocumentImage', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)
  let result: RDocumentImage[] = []

  test('should return non-empty array of images', async () => {
    result = await getDocumentImages(docReaderResponse)

    expect(result.length).toBeGreaterThan(0)
  })

  test('should return valid array of images', () => {
    const isValid = RDocumentImage.isValid(result)

    expect(isValid).toBe(true)
  })
})
