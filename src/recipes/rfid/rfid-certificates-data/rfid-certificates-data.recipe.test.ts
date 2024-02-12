import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/rfid.json'
import { getRfidCertificatesData } from './rfid-certificates-data.recipe'


describe('getRfidChecksSummary', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should valid result', () => {
    const result = getRfidCertificatesData(docReaderResponse)

    expect(result).toBeDefined()
  })
})
