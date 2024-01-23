import { eCheckResult, ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/0.json'
import { getDetailedStatus } from './get-detailed-status.recipe'
import { eOpticalStatusField } from '@/recipes/status/detailed-status/models'


describe('getDocumentImage', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should return status', async () => {
    const result = await getDetailedStatus(docReaderResponse)

    expect(result.optical[eOpticalStatusField.DOC_TYPE]).toBe(eCheckResult.OK)
    expect(result.optical[eOpticalStatusField.OVERALL]).toBe(eCheckResult.ERROR)
    expect(result.optical[eOpticalStatusField.TEXT]).toBe(eCheckResult.ERROR)
    expect(result.optical[eOpticalStatusField.SECURITY]).toBe(eCheckResult.WAS_NOT_DONE)
    expect(result.optical[eOpticalStatusField.MRZ]).toBe(eCheckResult.ERROR)
    expect(result.optical[eOpticalStatusField.IMAGE_QA]).toBe(eCheckResult.OK)
    expect(result.optical[eOpticalStatusField.EXPIRY]).toBe(eCheckResult.ERROR)
  })
})
