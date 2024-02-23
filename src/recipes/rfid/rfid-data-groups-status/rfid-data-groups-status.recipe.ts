import {
  DocBinaryInfoContainer,
  eRfidDataFileType,
  eRfidErrorCodes,
  ProcessResponse
} from '@regulaforensics/document-reader-typings'

import { eDataGroup, RRfidDataGroupStatus } from './models'

/**
* Get Rfid checks summary
* @param {ProcessResponse} input
* @returns {RRfidDataGroupStatus[]}
*/
export const getRfidDataGroupsStatus = (input: ProcessResponse): RRfidDataGroupStatus[] => {
  const binary = DocBinaryInfoContainer.fromProcessResponse(input)

  const countOfDataGroups = Object.keys(eDataGroup).length / 2
  const result: RRfidDataGroupStatus[] = []

  for (let i = 0; i < countOfDataGroups; i++) {
    const dummy = new RRfidDataGroupStatus()
    dummy.group = i + 1
    dummy.status = eRfidErrorCodes.ERROR_NOT_PERFORMED

    result.push(dummy)
  }

  binary.forEach((container) => {
    const sessionData = container.TDocBinaryInfo.RFID_BINARY_DATA.RFID_Session_Data

    sessionData.Applications.forEach((application) => {
      application.Files.forEach((file) => {
        const dataGroup = file.Type
        const status = file.PA_Status

        let mappedDg: eDataGroup | undefined

        switch (dataGroup) {
          case eRfidDataFileType.ID_DG1:
          case eRfidDataFileType.PASSPORT_DG1:
          case eRfidDataFileType.DL_DG1:
            mappedDg = eDataGroup.DG1
            break
          case eRfidDataFileType.ID_DG2:
          case eRfidDataFileType.PASSPORT_DG2:
          case eRfidDataFileType.DL_DG2:
            mappedDg = eDataGroup.DG2
            break
          case eRfidDataFileType.ID_DG3:
          case eRfidDataFileType.PASSPORT_DG3:
          case eRfidDataFileType.DL_DG3:
            mappedDg = eDataGroup.DG3
            break
          case eRfidDataFileType.ID_DG4:
          case eRfidDataFileType.PASSPORT_DG4:
          case eRfidDataFileType.DL_DG4:
            mappedDg = eDataGroup.DG4
            break
          case eRfidDataFileType.ID_DG5:
          case eRfidDataFileType.PASSPORT_DG5:
          case eRfidDataFileType.DL_DG5:
            mappedDg = eDataGroup.DG5
            break
          case eRfidDataFileType.ID_DG6:
          case eRfidDataFileType.PASSPORT_DG6:
          case eRfidDataFileType.DL_DG6:
            mappedDg = eDataGroup.DG6
            break
          case eRfidDataFileType.ID_DG7:
          case eRfidDataFileType.PASSPORT_DG7:
          case eRfidDataFileType.DL_DG7:
            mappedDg = eDataGroup.DG7
            break
          case eRfidDataFileType.ID_DG8:
          case eRfidDataFileType.PASSPORT_DG8:
          case eRfidDataFileType.DL_DG8:
            mappedDg = eDataGroup.DG8
            break
          case eRfidDataFileType.ID_DG9:
          case eRfidDataFileType.PASSPORT_DG9:
          case eRfidDataFileType.DL_DG9:
            mappedDg = eDataGroup.DG9
            break
          case eRfidDataFileType.ID_DG10:
          case eRfidDataFileType.PASSPORT_DG10:
          case eRfidDataFileType.DL_DG10:
            mappedDg = eDataGroup.DG10
            break
          case eRfidDataFileType.ID_DG11:
          case eRfidDataFileType.PASSPORT_DG11:
          case eRfidDataFileType.DL_DG11:
            mappedDg = eDataGroup.DG11
            break
          case eRfidDataFileType.ID_DG12:
          case eRfidDataFileType.PASSPORT_DG12:
          case eRfidDataFileType.DL_DG12:
            mappedDg = eDataGroup.DG12
            break
          case eRfidDataFileType.ID_DG13:
          case eRfidDataFileType.PASSPORT_DG13:
          case eRfidDataFileType.DL_DG13:
            mappedDg = eDataGroup.DG13
            break
          case eRfidDataFileType.ID_DG14:
          case eRfidDataFileType.PASSPORT_DG14:
          case eRfidDataFileType.DL_DG14:
            mappedDg = eDataGroup.DG14
            break
          case eRfidDataFileType.ID_DG15:
          case eRfidDataFileType.PASSPORT_DG15:
            mappedDg = eDataGroup.DG15
            break
          case eRfidDataFileType.ID_DG16:
          case eRfidDataFileType.PASSPORT_DG16:
            mappedDg = eDataGroup.DG16
            break
          case eRfidDataFileType.ID_DG17:
          case eRfidDataFileType.PASSPORT_DG17:
            mappedDg = eDataGroup.DG17
            break
          case eRfidDataFileType.ID_DG18:
          case eRfidDataFileType.PASSPORT_DG18:
            mappedDg = eDataGroup.DG18
            break
          case eRfidDataFileType.ID_DG19:
          case eRfidDataFileType.PASSPORT_DG19:
            mappedDg = eDataGroup.DG19
            break
          case eRfidDataFileType.ID_DG20:
          case eRfidDataFileType.PASSPORT_DG20:
            mappedDg = eDataGroup.DG20
            break
          case eRfidDataFileType.ID_DG21:
            mappedDg = eDataGroup.DG21
            break
        }

        if (mappedDg) {
          result[mappedDg - 1].status = status
        }
      })
    })
  })


  return result
}
