import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/2.json'
import { getTextData } from './get-text-data.recipe'


describe('getTextData', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should be defined', () => {
    const result = getTextData(docReaderResponse)

    expect(result).toBeDefined()
  })
})
