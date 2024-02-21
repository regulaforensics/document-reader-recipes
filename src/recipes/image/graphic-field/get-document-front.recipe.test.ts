import 'reflect-metadata'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RGraphicField } from './models'
import { getDocumentFront } from './get-document-front.recipe'


const DIRECTORY = String(process.env.PROCESS_RESPONSE_JSONS_DIR)

describe('getDocumentFront', () => {
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


    test(`file '${file}': should be defined`, async () => {
      let result: RGraphicField = await getDocumentFront(docReaderResponse)

      expect(result).toBeDefined()
    })

    test(`file '${file}': should return valid image`,  async () => {
      let result: RGraphicField = await getDocumentFront(docReaderResponse)

      expect(result.src).toMatch(/^data:image\/jpeg;base64/)
    })

    test(`file '${file}': should return valid model`, async () => {
      let result: RGraphicField = await getDocumentFront(docReaderResponse)

      const isValid = RGraphicField.isValid(result)
      expect(isValid).toBeTruthy()
    })
  })
})
