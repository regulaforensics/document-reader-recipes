import { ProcessResponse } from '@regulaforensics/document-reader-typings'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import { eOpticalStatusField, RDetailedStatus } from './models'
import { getDetailedStatus } from './get-detailed-status.recipe'


const DIRECTORY = String(process.env.PROCESS_RESPONSE_JSONS_DIR)

describe('getDetailedStatus', () => {
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
    const result = getDetailedStatus(docReaderResponse)
    const isValid = RDetailedStatus.isValid(result)

    test('should be defined', () => {
      expect(result).toBeDefined()
    })

    test('should be valid', () => {
      expect(isValid).toBe(true)
    })

    test('should return DOC_TYPE status', () => {
      expect(result.optical[eOpticalStatusField.DOC_TYPE]).toBeDefined()
    })

    test('should return TEXT status', () => {
      expect(result.optical[eOpticalStatusField.TEXT]).toBeDefined()
    })

    test('should return SECURITY status', () => {
      expect(result.optical[eOpticalStatusField.SECURITY]).toBeDefined()
    })

    test('should return MRZ status', () => {
      expect(result.optical[eOpticalStatusField.MRZ]).toBeDefined()
    })

    test('should return IMAGE_QA status', () => {
      expect(result.optical[eOpticalStatusField.IMAGE_QA]).toBeDefined()
    })

    test('should return EXPIRY status', () => {
      expect(result.optical[eOpticalStatusField.EXPIRY]).toBeDefined()
    })
  })
})
