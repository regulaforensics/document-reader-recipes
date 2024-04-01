import { ProcessResponse } from '@regulaforensics/document-reader-typings'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import { getPortraitsComparison } from './get-portraits-comparison.recipe'


const DIRECTORY = String(process.env.PROCESS_RESPONSE_JSONS_DIR)

describe('getPortraitsComparison', () => {
  const files = readdirSync(DIRECTORY)

  files.forEach((file) => {
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


    test(`file '${file}': should return authenticity check list`, () => {
      const result = getPortraitsComparison(docReaderResponse)

      expect(result).toBeDefined()
    })
  })
})
