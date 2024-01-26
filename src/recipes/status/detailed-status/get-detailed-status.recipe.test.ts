import { ProcessResponse } from '@regulaforensics/document-reader-typings'

import rawDocReaderResponse from '@/test-data/0.json'
import { getDetailedStatus } from './get-detailed-status.recipe'
import { eOpticalStatusField, RDetailedStatus } from './models'


describe('getDetailedStatus', () => {
  const docReaderResponse = ProcessResponse.fromPlain(rawDocReaderResponse)
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

  test('should return OVERALL status', () => {
    expect(result.optical[eOpticalStatusField.OVERALL]).toBeDefined()
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
