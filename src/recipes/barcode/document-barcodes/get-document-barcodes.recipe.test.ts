import { ProcessResponse } from '@regulaforensics/document-reader-typings'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import { RDocumentBarcode } from './models'
import { getDocumentBarcodes } from './get-document-barcodes.recipe'


const DIRECTORY = String(process.env.PROCESS_RESPONSE_JSONS_DIR)

describe('getDocumentBarcodes', () => {
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
    const result = getDocumentBarcodes(docReaderResponse)
    const isValid = RDocumentBarcode.isValid(result)

    test(`file '${file}': should return valid array of images`, () => {
      expect(isValid).toBe(true)
    })
  })
})
