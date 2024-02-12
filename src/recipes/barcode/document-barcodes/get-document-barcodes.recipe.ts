import {
  DocBarCodeInfoContainer,
  eBarCodeResultCodes,
  eBarCodeType,
  ProcessResponse
} from '@regulaforensics/document-reader-typings'

import { RDocumentBarcode, RDocumentBarcodeField, RDocumentBarcodeModuleData } from './models'


/**
* Get information about barcodes from the document
* @param {ProcessResponse} input - ProcessResponse from DocReader
* @returns {RDocumentBarcode[]} - array of RDocumentBarcode
*/
export const getDocumentBarcodes = (input: ProcessResponse): RDocumentBarcode[] => {
  const result: RDocumentBarcode[] = []

  const containers = DocBarCodeInfoContainer.fromProcessResponse(input, false)

  containers.forEach((container) => {
    if (!container.DocBarCodeInfo?.pArrayFields?.length) {
      return
    }

    const current = new RDocumentBarcode()
    current.pageIndex = container.page_idx || 1
    current.fields = []

    container.DocBarCodeInfo.pArrayFields.map((data, field) => {
      const currentField = new RDocumentBarcodeField()

      currentField.fieldIndex = field
      currentField.resultCode = data.bcCodeResult || eBarCodeResultCodes.NO_ERR
      currentField.type = data.bcType_DECODE || eBarCodeType.UNKNOWN
      currentField.modulesData = []

      // field length
      data.bcDataModule?.map((bcModule) => {
        if (
          typeof bcModule.mLength === 'undefined'
          || typeof bcModule.mType === 'undefined'
          || typeof bcModule.mData === 'undefined'
        ) {
          return
        }

        const currentModuleData = new RDocumentBarcodeModuleData()

        currentModuleData.data = bcModule.mData
        currentModuleData.length = bcModule.mLength
        currentModuleData.type = bcModule.mType

        currentField.modulesData.push(currentModuleData)
      })

      current.fields.push(currentField)
    })

    result.push(current)
  })

  return result.filter(i => !!i.fields.length)
}
