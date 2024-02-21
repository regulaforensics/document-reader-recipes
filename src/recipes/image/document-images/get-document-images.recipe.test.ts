import 'reflect-metadata'
import { join } from 'path'
import { readdirSync, readFileSync } from 'fs'
import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RDocumentImage } from './models'
import { getDocumentImages } from './get-document-images.recipe'


const DIRECTORY = String(process.env.PROCESS_RESPONSE_JSONS_DIR)

describe('getDocumentImage', () => {
  const files = readdirSync(DIRECTORY)

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const filePath = join(DIRECTORY, file)

    if (!filePath.endsWith('.json')) {
      continue
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

    test(`file '${file}': should return non-empty array of images`, async() => {
      let result: RDocumentImage[] = await getDocumentImages(docReaderResponse)

      expect(result.length).toBeGreaterThan(0)
    })

    /*
    test('should return valid array of images', () => {
      const isValid = RDocumentImage.isValid(result)

      expect(isValid).toBe(true)
    })
    */
  }
})
