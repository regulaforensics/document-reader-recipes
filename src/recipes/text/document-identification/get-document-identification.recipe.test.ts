import { ProcessResponse } from '@regulaforensics/document-reader-typings'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import { RDocumentIdentification } from './models'
import { getDocumentIdentification } from './get-document-identification.recipe'


const DIRECTORY = String(process.env.PROCESS_RESPONSE_JSONS_DIR)

describe('getDocumentIdentification', () => {
  const files = readdirSync(DIRECTORY)

  files.forEach(async (file) => {
    const filePath = join(DIRECTORY, file)

    if (!filePath.endsWith('.json')) {
      return
    }

    const fileContent = readFileSync(filePath, 'utf-8')

    let isValidJSON = true
    let response = ''

    try {
      response = JSON.parse(fileContent)
    } catch (e) {
      isValidJSON = false
    }

    test(`file '${file}': should be a valid JSON`, () => {
      expect(isValidJSON).toBe(true)
    })

    const docReaderResponse = ProcessResponse.fromPlain(response)
    const result = getDocumentIdentification(docReaderResponse, true)
    const isValid = RDocumentIdentification.isValid(result)

    test('should be defined', () => {
      expect(result).toBeDefined()
    })

    test('should be valid', () => {
      expect(isValid).toBeTruthy()
    })

    test('should return pageIndex', async () => {
      expect(result.pageIndex).toBeDefined()
      expect(result.pageIndex).toEqual(1)
    })

    /*  test('should return undefined if there is no OneCandidateContainer and allowDefault is false', async () => {
        const result = getDocumentIdentification(docReaderResponseWithoutOneCandidate, false)

        expect(result).toBeUndefined()
      })

      test('should return default value if there is no OneCandidateContainer and allowDefault is true', async () => {
        const result = getDocumentIdentification(docReaderResponseWithoutOneCandidate, true)

        expect(result).toBeDefined()
        expect(result?.documentName).toEqual('UNKNOWN')
        expect(result?.pageIndex).toEqual(1)
      })*/
  })
})
