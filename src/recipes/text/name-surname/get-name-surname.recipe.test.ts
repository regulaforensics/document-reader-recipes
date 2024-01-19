import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/2.json'
import { getNameSurname } from './get-name-surname.recipe'


describe('getNameSurname', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should be defined', () => {
    const result = getNameSurname(docReaderResponse)

    expect(result).toBeDefined()
  })
})
