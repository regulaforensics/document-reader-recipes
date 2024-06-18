import { eCheckResult, ProcessResponse, StatusContainer } from '@regulaforensics/document-reader-typings'

import {
  eOpticalStatusField,
  eRfidStatusField,
  eSummaryStatusField,
  RDetailedStatus,
  RDetailedStatusOptical,
  RDetailedStatusRfid,
  RDetailedStatusSummary
} from './models'


export const getDetailedStatus = (input: ProcessResponse): RDetailedStatus => {
  const result = new RDetailedStatus()
  const container = StatusContainer.fromProcessResponse(input)
  result.overallStatus = eCheckResult.WAS_NOT_DONE

  if (!container.length) {
    result.optical = new RDetailedStatusOptical()
    result.optical[eOpticalStatusField.DOC_TYPE] = eCheckResult.WAS_NOT_DONE
    result.optical[eOpticalStatusField.TEXT] = eCheckResult.WAS_NOT_DONE
    result.optical[eOpticalStatusField.SECURITY] = eCheckResult.WAS_NOT_DONE
    result.optical[eOpticalStatusField.MRZ] = eCheckResult.WAS_NOT_DONE
    result.optical[eOpticalStatusField.IMAGE_QA] = eCheckResult.WAS_NOT_DONE
    result.optical[eOpticalStatusField.EXPIRY] = eCheckResult.WAS_NOT_DONE

    result.rfId = new RDetailedStatusRfid()
    result.rfId[eRfidStatusField.AA] = eCheckResult.WAS_NOT_DONE
    result.rfId[eRfidStatusField.BAC] = eCheckResult.WAS_NOT_DONE
    result.rfId[eRfidStatusField.CA] = eCheckResult.WAS_NOT_DONE
    result.rfId[eRfidStatusField.PA] = eCheckResult.WAS_NOT_DONE
    result.rfId[eRfidStatusField.PACE] = eCheckResult.WAS_NOT_DONE
    result.rfId[eRfidStatusField.TA] = eCheckResult.WAS_NOT_DONE

    result.summary = new RDetailedStatusSummary()
    result.summary[eSummaryStatusField.OPTICAL] = eCheckResult.WAS_NOT_DONE
    result.summary[eSummaryStatusField.PORTRAIT] = eCheckResult.WAS_NOT_DONE
    result.summary[eSummaryStatusField.RFID] = eCheckResult.WAS_NOT_DONE
    result.summary[eSummaryStatusField.STOP_LIST] = eCheckResult.WAS_NOT_DONE

    return result
  }

  const status = container[0].Status

  result.overallStatus = status.overallStatus

  result.optical = new RDetailedStatusOptical()
  result.optical[eOpticalStatusField.DOC_TYPE] = status.detailsOptical.docType ?? eCheckResult.WAS_NOT_DONE
  result.optical[eOpticalStatusField.TEXT] = status.detailsOptical.text ?? eCheckResult.WAS_NOT_DONE
  result.optical[eOpticalStatusField.SECURITY] = status.detailsOptical.security ?? eCheckResult.WAS_NOT_DONE
  result.optical[eOpticalStatusField.MRZ] = status.detailsOptical.mrz ?? eCheckResult.WAS_NOT_DONE
  result.optical[eOpticalStatusField.IMAGE_QA] = status.detailsOptical.imageQA ?? eCheckResult.WAS_NOT_DONE
  result.optical[eOpticalStatusField.EXPIRY] = status.detailsOptical.expiry ?? eCheckResult.WAS_NOT_DONE

  result.rfId = new RDetailedStatusRfid()
  result.rfId[eRfidStatusField.AA] = status.detailsRFID?.AA ?? eCheckResult.WAS_NOT_DONE
  result.rfId[eRfidStatusField.BAC] = status.detailsRFID?.BAC ?? eCheckResult.WAS_NOT_DONE
  result.rfId[eRfidStatusField.CA] = status.detailsRFID?.CA ?? eCheckResult.WAS_NOT_DONE
  result.rfId[eRfidStatusField.PA] = status.detailsRFID?.PA ?? eCheckResult.WAS_NOT_DONE
  result.rfId[eRfidStatusField.PACE] = status.detailsRFID?.PACE ?? eCheckResult.WAS_NOT_DONE
  result.rfId[eRfidStatusField.TA] = status.detailsRFID?.TA ?? eCheckResult.WAS_NOT_DONE

  result.summary = new RDetailedStatusSummary()
  result.summary[eSummaryStatusField.OPTICAL] = status.optical ?? eCheckResult.WAS_NOT_DONE
  result.summary[eSummaryStatusField.PORTRAIT] = status.portrait ?? eCheckResult.WAS_NOT_DONE
  result.summary[eSummaryStatusField.RFID] = status.rfid ?? eCheckResult.WAS_NOT_DONE
  result.summary[eSummaryStatusField.STOP_LIST] = status.stopList ?? eCheckResult.WAS_NOT_DONE

  return result
}
