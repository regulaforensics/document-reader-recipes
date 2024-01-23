import { eCheckResult, ProcessResponse, StatusContainer } from '@regulaforensics/document-reader-typings'

import { eOpticalStatusField, RDetailedStatus, ROpticalStatusDetails } from './models'


export const getDetailedStatus = async (input: ProcessResponse): Promise<RDetailedStatus> => {
  const result = new RDetailedStatus()
  const container = StatusContainer.fromProcessResponse(input)

  if (!container.length) {
    result.optical = new ROpticalStatusDetails()
    result.optical[eOpticalStatusField.DOC_TYPE] = eCheckResult.WAS_NOT_DONE
    result.optical[eOpticalStatusField.OVERALL] = eCheckResult.WAS_NOT_DONE
    result.optical[eOpticalStatusField.TEXT] = eCheckResult.WAS_NOT_DONE
    result.optical[eOpticalStatusField.SECURITY] = eCheckResult.WAS_NOT_DONE
    result.optical[eOpticalStatusField.MRZ] = eCheckResult.WAS_NOT_DONE
    result.optical[eOpticalStatusField.IMAGE_QA] = eCheckResult.WAS_NOT_DONE
    result.optical[eOpticalStatusField.EXPIRY] = eCheckResult.WAS_NOT_DONE
  }

  const status = container[0].Status

  result.optical = new ROpticalStatusDetails()
  result.optical[eOpticalStatusField.DOC_TYPE] = status.detailsOptical.docType
  result.optical[eOpticalStatusField.OVERALL] = status.overallStatus
  result.optical[eOpticalStatusField.TEXT] = status.detailsOptical.text
  result.optical[eOpticalStatusField.SECURITY] = status.detailsOptical.security
  result.optical[eOpticalStatusField.MRZ] = status.detailsOptical.mrz
  result.optical[eOpticalStatusField.IMAGE_QA] = status.detailsOptical.imageQA
  result.optical[eOpticalStatusField.EXPIRY] = status.detailsOptical.expiry

  return result
}
