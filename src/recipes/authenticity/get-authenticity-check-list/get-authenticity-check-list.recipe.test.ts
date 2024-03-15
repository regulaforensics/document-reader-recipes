import { ProcessResponse } from '@regulaforensics/document-reader-typings'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import { getAuthenticityCheckList } from './get-authenticity-check-list.recipe'


const DIRECTORY = String(process.env.PROCESS_RESPONSE_JSONS_DIR)

describe('getAuthenticityCheckList', () => {
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
      const result = getAuthenticityCheckList(docReaderResponse)

      console.log(JSON.stringify(result, null, 2))

      expect(result).toBeDefined()
    })
  })
})
