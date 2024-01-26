import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/2.json'
import { RNameSurname } from './models'
import { getNameSurname } from './get-name-surname.recipe'


describe('getNameSurname', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)
  const result = getNameSurname(docReaderResponse)
  const isValid = RNameSurname.isValid(result)

  test('should be defined', () => {
    expect(result).toBeDefined()
  })

  test('should be valid', () => {
    expect(isValid).toBeTruthy()
  })
})
