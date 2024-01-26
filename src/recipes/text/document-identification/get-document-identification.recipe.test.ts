import { OneCandidateContainerResultTypes, ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/0.json'
import { getDocumentIdentification } from './get-document-identification.recipe'


describe('getDocumentIdentification', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)
  const result = getDocumentIdentification(docReaderResponse)

  test('should be defined', () => {
    expect(result).toBeDefined()
  })

  test('should return valid value', async () => {
    expect(result.documentName).toEqual('Serbia - ePassport (2008)')
  })

  test('should return pageIndex', async () => {
    expect(result.pageIndex).toBeDefined()
    expect(result.pageIndex).toEqual(1)
  })

  const docReaderResponseWithoutOneCandidate = ProcessResponse.fromPlain(rawDocReaderResponse)
  docReaderResponseWithoutOneCandidate.ContainerList.List = docReaderResponse.ContainerList.List
    .filter((container) => !OneCandidateContainerResultTypes.includes(container.result_type as any))

  test('should return undefined if there is no OneCandidateContainer and allowDefault is false', async () => {
    const result = getDocumentIdentification(docReaderResponseWithoutOneCandidate, false)

    expect(result).toBeUndefined()
  })

  test('should return default value if there is no OneCandidateContainer and allowDefault is true', async () => {
    const result = getDocumentIdentification(docReaderResponseWithoutOneCandidate, true)

    expect(result).toBeDefined()
    expect(result?.documentName).toEqual('UNKNOWN')
    expect(result?.pageIndex).toEqual(1)
  })
})
