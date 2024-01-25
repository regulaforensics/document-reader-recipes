import { eCheckResult, eVisualFieldType, ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/2.json'
import { getTextFieldValue } from './get-text-field-value.recipe'


describe('getTextFieldValue', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should return value', () => {
    const result = getTextFieldValue(docReaderResponse, eVisualFieldType.DOCUMENT_NUMBER)

    expect(result).toBeDefined()
    expect(result.value).toBe('X80856222')
    expect(result.status).toBe(eCheckResult.OK)
  })
})
