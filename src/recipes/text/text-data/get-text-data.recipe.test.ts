import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/2.json'
import { RTextData } from './models'
import { getTextData } from './get-text-data.recipe'


describe('getTextData', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)
  const result = getTextData(docReaderResponse)
  const isValid = RTextData.isValid(result)

  test('should be defined', () => {
    expect(result).toBeDefined()
  })

  test('should be valid', () => {
    expect(isValid).toBeTruthy()
  })
})
