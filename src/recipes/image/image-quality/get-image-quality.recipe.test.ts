import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/0.json'
import { getImageQuality } from './get-image-quality.recipe'


describe('getImageQuality', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should return not empty array of image quality checks', () => {
    const result = getImageQuality(docReaderResponse)

    expect(result).not.toHaveLength(0)
  })
})
