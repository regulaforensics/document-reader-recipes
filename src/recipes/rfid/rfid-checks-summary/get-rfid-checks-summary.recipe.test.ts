import { eCheckResult, ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/rfid.json'
import rawDocReaderResponse2 from '@/test-data/1.json'
import { getRfidChecksSummary } from './get-rfid-checks-summary.recipe'


describe('getRfidChecksSummary', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should valid result', () => {
    const result = getRfidChecksSummary(docReaderResponse)

    expect(result).toBeDefined()
    expect(result.overallStatus).toEqual(eCheckResult.ERROR)
    expect(result.AA).toEqual(eCheckResult.WAS_NOT_DONE)
    expect(result.BAC).toEqual(eCheckResult.OK)
    expect(result.CA).toEqual(eCheckResult.WAS_NOT_DONE)
    expect(result.PA).toEqual(eCheckResult.ERROR)
    expect(result.PACE).toEqual(eCheckResult.WAS_NOT_DONE)
    expect(result.TA).toEqual(eCheckResult.WAS_NOT_DONE)
  })

  const docReaderResponse2 = ProcessResponse.fromPlain(rawDocReaderResponse2)

  test('should return default value if there is no RFID checks', async () => {
    const result = getRfidChecksSummary(docReaderResponse2)

    expect(result).toBeDefined()
    expect(result.overallStatus).toEqual(eCheckResult.WAS_NOT_DONE)
    expect(result.AA).toEqual(eCheckResult.WAS_NOT_DONE)
    expect(result.BAC).toEqual(eCheckResult.WAS_NOT_DONE)
    expect(result.CA).toEqual(eCheckResult.WAS_NOT_DONE)
    expect(result.PA).toEqual(eCheckResult.WAS_NOT_DONE)
    expect(result.PACE).toEqual(eCheckResult.WAS_NOT_DONE)
    expect(result.TA).toEqual(eCheckResult.WAS_NOT_DONE)
  })
})
