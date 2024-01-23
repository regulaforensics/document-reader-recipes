import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/7.json'
import { getDocumentBarcodes } from './get-document-barcodes.recipe'


describe('getDocumentBarcodes', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should return non-empty array of images', () => {
    const result = getDocumentBarcodes(docReaderResponse)

    expect(result.length).toBeGreaterThan(0)
  })
})
