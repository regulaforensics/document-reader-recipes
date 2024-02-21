import { ProcessResponse } from '@regulaforensics/document-reader-typings'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import { RTextData } from './models'
import { getTextData } from './get-text-data.recipe'


const DIRECTORY = String(process.env.PROCESS_RESPONSE_JSONS_DIR)

describe('getTextData', () => {
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
    const result = getTextData(docReaderResponse)
    const isValid = RTextData.isValid(result)

    test('should be defined', () => {
      expect(result).toBeDefined()
    })

    test('should be valid', () => {
      expect(isValid).toBeTruthy()
    })
  })
})
