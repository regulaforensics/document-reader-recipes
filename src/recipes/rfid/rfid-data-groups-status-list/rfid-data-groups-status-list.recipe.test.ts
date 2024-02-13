import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/rfid.json'
import { getRfidDataGroupsStatusList } from './rfid-data-groups-status-list.recipe'


describe('getRfidDataGroupsStatusList', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)

  test('should return some results', () => {
    const result = getRfidDataGroupsStatusList(docReaderResponse)

    expect(result.length).toBeGreaterThan(0)
  })
})
