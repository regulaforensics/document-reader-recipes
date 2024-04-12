import {
  DocBinaryInfoContainer,
  eRfidApplicationType,
  eRfidDataFileType,
  eRfidErrorCodes,
  ProcessResponse
} from '@regulaforensics/document-reader-typings'

import { eDataGroupReadStatus, RRfidDataGroupStatus } from './models'

/**
* Get Rfid checks summary
* @param {ProcessResponse} input
* @returns {RRfidDataGroupStatus[]}
*/
export const getRfidDataGroupsStatus = (input: ProcessResponse): RRfidDataGroupStatus[] => {
  const binary = DocBinaryInfoContainer.fromProcessResponse(input)

  let result: RRfidDataGroupStatus[] = []

  binary.forEach((container) => {
    const sessionData = container.TDocBinaryInfo.RFID_BINARY_DATA.RFID_Session_Data
    const notRead = container.TDocBinaryInfo.RFID_BINARY_DATA.RFID_ePassp_Directory

    sessionData.Applications.forEach((application) => {
      const chipType = application.Type
      const tmp: { index: number,  status: eDataGroupReadStatus }[] = []

      application.Files.forEach((file) => {
        const dataGroup = file.Type

        let mappedDg: number | undefined

        switch (dataGroup) {
          case eRfidDataFileType.ID_DG1:
          case eRfidDataFileType.PASSPORT_DG1:
          case eRfidDataFileType.DL_DG1:
            mappedDg = 1
            break
          case eRfidDataFileType.ID_DG2:
          case eRfidDataFileType.PASSPORT_DG2:
          case eRfidDataFileType.DL_DG2:
            mappedDg = 2
            break
          case eRfidDataFileType.ID_DG3:
          case eRfidDataFileType.PASSPORT_DG3:
          case eRfidDataFileType.DL_DG3:
            mappedDg = 3
            break
          case eRfidDataFileType.ID_DG4:
          case eRfidDataFileType.PASSPORT_DG4:
          case eRfidDataFileType.DL_DG4:
            mappedDg = 4
            break
          case eRfidDataFileType.ID_DG5:
          case eRfidDataFileType.PASSPORT_DG5:
          case eRfidDataFileType.DL_DG5:
            mappedDg = 5
            break
          case eRfidDataFileType.ID_DG6:
          case eRfidDataFileType.PASSPORT_DG6:
          case eRfidDataFileType.DL_DG6:
            mappedDg = 6
            break
          case eRfidDataFileType.ID_DG7:
          case eRfidDataFileType.PASSPORT_DG7:
          case eRfidDataFileType.DL_DG7:
            mappedDg = 7
            break
          case eRfidDataFileType.ID_DG8:
          case eRfidDataFileType.PASSPORT_DG8:
          case eRfidDataFileType.DL_DG8:
            mappedDg = 8
            break
          case eRfidDataFileType.ID_DG9:
          case eRfidDataFileType.PASSPORT_DG9:
          case eRfidDataFileType.DL_DG9:
            mappedDg = 9
            break
          case eRfidDataFileType.ID_DG10:
          case eRfidDataFileType.PASSPORT_DG10:
          case eRfidDataFileType.DL_DG10:
            mappedDg = 10
            break
          case eRfidDataFileType.ID_DG11:
          case eRfidDataFileType.PASSPORT_DG11:
          case eRfidDataFileType.DL_DG11:
            mappedDg = 11
            break
          case eRfidDataFileType.ID_DG12:
          case eRfidDataFileType.PASSPORT_DG12:
          case eRfidDataFileType.DL_DG12:
            mappedDg = 12
            break
          case eRfidDataFileType.ID_DG13:
          case eRfidDataFileType.PASSPORT_DG13:
          case eRfidDataFileType.DL_DG13:
            mappedDg = 13
            break
          case eRfidDataFileType.ID_DG14:
          case eRfidDataFileType.PASSPORT_DG14:
          case eRfidDataFileType.DL_DG14:
            mappedDg = 14
            break
          case eRfidDataFileType.ID_DG15:
          case eRfidDataFileType.PASSPORT_DG15:
            mappedDg = 15
            break
          case eRfidDataFileType.ID_DG16:
          case eRfidDataFileType.PASSPORT_DG16:
            mappedDg = 16
            break
          case eRfidDataFileType.ID_DG17:
          case eRfidDataFileType.PASSPORT_DG17:
            mappedDg = 17
            break
          case eRfidDataFileType.ID_DG18:
          case eRfidDataFileType.PASSPORT_DG18:
            mappedDg = 18
            break
          case eRfidDataFileType.ID_DG19:
          case eRfidDataFileType.PASSPORT_DG19:
            mappedDg = 19
            break
          case eRfidDataFileType.ID_DG20:
          case eRfidDataFileType.PASSPORT_DG20:
            mappedDg = 20
            break
          case eRfidDataFileType.ID_DG21:
            mappedDg = 21
            break
        }

        let status: eDataGroupReadStatus = eDataGroupReadStatus.NOT_AVAILABLE

        switch (file.PA_Status) {
          case eRfidErrorCodes.ERROR_NO_ERROR:
            status = eDataGroupReadStatus.NO_ERROR
            break
          case eRfidErrorCodes.ERROR_NOT_PERFORMED:
            status = eDataGroupReadStatus.NOT_PERFORMED
            break
          case eRfidErrorCodes.ERROR_NOT_AVAILABLE:
            status = eDataGroupReadStatus.NOT_AVAILABLE
            break;
          case eRfidErrorCodes.ERROR_FAILED:
            status = eDataGroupReadStatus.FAILED
            break
        }

        if (notRead.includes(mappedDg || 0)) {
          status = eDataGroupReadStatus.NOT_PERFORMED
        }


        if (mappedDg) {
          tmp.push({
            index: mappedDg,
            status
          })
        }
      })

      if (tmp.length) {
        const sorted = tmp.sort((a, b) => a.index - b.index)

        let fillTo = 0

        switch (chipType) {
          case eRfidApplicationType.E_PASSPORT:
            fillTo = 16
            break
          case eRfidApplicationType.E_ID:
            fillTo = 21
            break
          case eRfidApplicationType.E_DL:
            fillTo = 14
            break
          default:
            const groups = sorted.map((item) => item.index)
            const max = Math.max(...groups)

            if (groups.includes(2) && groups.includes(3) && groups.includes(8) && max <= 8) {
              fillTo = 8
            } else if (groups.includes(1) && groups.includes(2) && groups.includes(6) && groups.includes(10) && max <= 10) {
              fillTo = 10
            } else {
              fillTo = max
            }

            break
        }


        // fill array with missing data groups
        for (let i = 1; i <= fillTo; i++) {
          if (!sorted.find((item) => item.index === i)) {
            sorted.splice(i - 1, 0, {
              index: i,
              status: eDataGroupReadStatus.NOT_AVAILABLE
            })
          }
        }

        result = sorted.map((item) => {
          const current = new RRfidDataGroupStatus()
          current.group = item.index
          current.status = item.status

          return current
        })
      }
    })
  })

  return result
}
