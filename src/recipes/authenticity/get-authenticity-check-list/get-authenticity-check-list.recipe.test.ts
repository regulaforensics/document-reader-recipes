import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/1.json'
import { getAuthenticityCheckList } from './get-authenticity-check-list.recipe'


describe('getAuthenticityCheckList', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should valid result', () => {
    const result = getAuthenticityCheckList(docReaderResponse)

    console.log(JSON.stringify(result))

    expect(result).toBeDefined()
  })
})
