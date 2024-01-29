import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/0.json'
import { RImageQuality } from './models'
import { getImageQuality } from './get-image-quality.recipe'


describe('getImageQuality', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)
  const result = getImageQuality(docReaderResponse)
  const isValid = RImageQuality.isValid(result)

  test('should return not empty array of image quality checks', () => {
    expect(result).not.toHaveLength(0)
  })

  test('should return valid model', () => {
    expect(isValid).toBeTruthy()
  })
})
