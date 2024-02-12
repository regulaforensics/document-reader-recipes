import {
  DocBinaryInfoContainer,
  eCheckResult,
  eRfidErrorCodes,
  ProcessResponse
} from '@regulaforensics/document-reader-typings'

import { RRfidDataGroupStatusItem } from './models'

/**
* Data group status
* @param {ProcessResponse} input
* @returns {RRfidDataGroupStatusItem[]}
*/
export const getRfidDataGroupsStatusList = (input: ProcessResponse): RRfidDataGroupStatusItem[] => {
  const binary = DocBinaryInfoContainer.fromProcessResponse(input, false)

  const result: RRfidDataGroupStatusItem[] = []

  binary.forEach((container) => {
    const sessionData = container.TDocBinaryInfo.RFID_BINARY_DATA.RFID_Session_Data

    sessionData.Applications.forEach((application) => {
      application.Files.forEach((file) => {
        const group = file.Type
        let status = eCheckResult.WAS_NOT_DONE

        switch (file.PA_Status) {
          case eRfidErrorCodes.ERROR_NOT_PERFORMED:
          case eRfidErrorCodes.ERROR_NOT_AVAILABLE:
            status = eCheckResult.WAS_NOT_DONE
            break
          case eRfidErrorCodes.ERROR_NO_ERROR:
            status = eCheckResult.OK
            break
          default:
            status = eCheckResult.ERROR
            break
        }

        result.push(RRfidDataGroupStatusItem.fromPlain({ group, status }))
      })
    })
  })

  return result
}
