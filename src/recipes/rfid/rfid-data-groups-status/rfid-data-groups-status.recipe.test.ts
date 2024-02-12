import { eRfidErrorCodes, ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/rfid.json'
import rawDocReaderResponse2 from '@/test-data/2.json'
import { getRfidDataGroupsStatus } from './rfid-data-groups-status.recipe'


describe('getRfidDataGroupsStatus', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should return some results', () => {
    const result = getRfidDataGroupsStatus(docReaderResponse)

    const hasChecked = result.some((status) => status.status === eRfidErrorCodes.ERROR_NO_ERROR)

    expect(hasChecked).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  const docReaderResponse2 = ProcessResponse.fromPlain(rawDocReaderResponse2)


  test('should return non-read data groups', () => {
    const result = getRfidDataGroupsStatus(docReaderResponse2)

    const notRead = result.filter((status) => status.status === eRfidErrorCodes.ERROR_NOT_PERFORMED)

    expect(notRead.length).toEqual(21)
  })
})
