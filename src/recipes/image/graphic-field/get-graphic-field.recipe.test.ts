import { eGraphicFieldType, eLights, ProcessResponse } from '@regulaforensics/document-reader-typings'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import { RGraphicField } from './models'
import { getGraphicField } from './get-graphic-field.recipe'


const DIRECTORY = String(process.env.PROCESS_RESPONSE_JSONS_DIR)

describe('getGraphicField', () => {
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

    let result: RGraphicField

    test(`file '${file}': should be defined`, async () => {
      result = await getGraphicField(docReaderResponse, eGraphicFieldType.DOCUMENT_FRONT)

      expect(result).toBeDefined()
    })

    test(`file '${file}': should return valid image`, async () => {
      expect(result.src).toMatch(/^data:image\/jpeg;base64/)
    })

    test(`file '${file}': should be able to return default image`, async () => {
      const result = await getGraphicField(docReaderResponse, eGraphicFieldType.DOCUMENT_FRONT, true, [eLights.HOLO])

      expect(result.src).toMatch(/^data:image\/png;base64/)
    })

    test(`file '${file}': should return undefined if no image found`, async () => {
      const result = await getGraphicField(docReaderResponse, eGraphicFieldType.PORTRAIT, false, [eLights.HOLO])

      expect(result).toBeUndefined()
    })

    test(`file '${file}': should return valid model`, async () => {
      const isValid = RGraphicField.isValid(result)

      expect(isValid).toBe(true)
    })
  })
})
