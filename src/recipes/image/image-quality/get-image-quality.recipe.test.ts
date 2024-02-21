import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RImageQuality } from './models'
import { getImageQuality } from './get-image-quality.recipe'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'


const DIRECTORY = String(process.env.PROCESS_RESPONSE_JSONS_DIR)

describe('getImageQuality', () => {
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

    const result = getImageQuality(docReaderResponse)
    const isValid = RImageQuality.isValid(result)

    test(`file '${file}': should return valid model`, () => {
      expect(isValid).toBeTruthy()
    })
  })
})
