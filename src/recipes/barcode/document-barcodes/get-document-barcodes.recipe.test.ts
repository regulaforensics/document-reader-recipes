import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/7.json'
import { RDocumentBarcode } from './models'
import { getDocumentBarcodes } from './get-document-barcodes.recipe'


describe('getDocumentBarcodes', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)
  const result = getDocumentBarcodes(docReaderResponse)
  const isValid = RDocumentBarcode.isAllValid(result)

  test('should return non-empty array of images', () => {
    expect(result.length).toBeGreaterThan(0)
  })

  test('should return valid array of images', () => {
    expect(isValid).toBe(true)
  })
})
