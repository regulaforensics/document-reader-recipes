import { eCheckResult, eVisualFieldType, ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/2.json'
import { RTextFieldValue } from './models'
import { getTextFieldValue } from './get-text-field-value.recipe'


describe('getTextFieldValue', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)
  const result = getTextFieldValue(docReaderResponse, eVisualFieldType.DOCUMENT_NUMBER)
  const isValid = RTextFieldValue.isValid(result)

  test('should be defined', () => {
    expect(result).toBeDefined()
  })

  test('should be valid', () => {
    expect(isValid).toBeTruthy()
  })

  test('should return value', () => {
    expect(result.value).toBe('X80856222')
    expect(result.status).toBe(eCheckResult.OK)
  })
})
