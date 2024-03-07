import { eCheckResult } from '@regulaforensics/document-reader-typings'

import {
  eOpticalStatusField,
  eRfidStatusField,
  eSummaryStatusField,
  RDetailedStatus,
  RDetailedStatusOptical,
  RDetailedStatusRfid,
  RDetailedStatusSummary
} from './models'


const mergeStatus = (statuses: RDetailedStatus[], getter: (item: RDetailedStatus) => eCheckResult): eCheckResult => {
  return statuses.reduce((acc: eCheckResult, status) => {
    if (acc === eCheckResult.ERROR) {
      return eCheckResult.ERROR
    }

    if (getter(status) === eCheckResult.ERROR) {
      return eCheckResult.ERROR
    }

    if (acc === eCheckResult.WAS_NOT_DONE && getter(status) === eCheckResult.OK) {
      return eCheckResult.OK
    }

    return eCheckResult.WAS_NOT_DONE
  }, eCheckResult.WAS_NOT_DONE)
}

export const mergeDetailedStatus = (statuses: RDetailedStatus[]): RDetailedStatus => {
  const result = new RDetailedStatus()

  result.overallStatus = mergeStatus(statuses, (status) => status.overallStatus)

  result.optical = new RDetailedStatusOptical()
  result.optical[eOpticalStatusField.DOC_TYPE] = mergeStatus(statuses, (status) => status.optical[eOpticalStatusField.DOC_TYPE])
  result.optical[eOpticalStatusField.TEXT] = mergeStatus(statuses, (status) => status.optical[eOpticalStatusField.TEXT])
  result.optical[eOpticalStatusField.SECURITY] = mergeStatus(statuses, (status) => status.optical[eOpticalStatusField.SECURITY])
  result.optical[eOpticalStatusField.MRZ] = mergeStatus(statuses, (status) => status.optical[eOpticalStatusField.MRZ])
  result.optical[eOpticalStatusField.IMAGE_QA] = mergeStatus(statuses, (status) => status.optical[eOpticalStatusField.IMAGE_QA])
  result.optical[eOpticalStatusField.EXPIRY] = mergeStatus(statuses, (status) => status.optical[eOpticalStatusField.EXPIRY])

  result.rfId = new RDetailedStatusRfid()
  result.rfId[eRfidStatusField.AA] = mergeStatus(statuses, (status) => status.rfId[eRfidStatusField.AA])
  result.rfId[eRfidStatusField.BAC] = mergeStatus(statuses, (status) => status.rfId[eRfidStatusField.BAC])
  result.rfId[eRfidStatusField.CA] = mergeStatus(statuses, (status) => status.rfId[eRfidStatusField.CA])
  result.rfId[eRfidStatusField.PA] = mergeStatus(statuses, (status) => status.rfId[eRfidStatusField.PA])
  result.rfId[eRfidStatusField.PACE] = mergeStatus(statuses, (status) => status.rfId[eRfidStatusField.PACE])
  result.rfId[eRfidStatusField.TA] = mergeStatus(statuses, (status) => status.rfId[eRfidStatusField.TA])

  result.summary = new RDetailedStatusSummary()
  result.summary[eSummaryStatusField.OPTICAL] = mergeStatus(statuses, (status) => status.summary[eSummaryStatusField.OPTICAL])
  result.summary[eSummaryStatusField.PORTRAIT] = mergeStatus(statuses, (status) => status.summary[eSummaryStatusField.PORTRAIT])
  result.summary[eSummaryStatusField.RFID] = mergeStatus(statuses, (status) => status.summary[eSummaryStatusField.RFID])
  result.summary[eSummaryStatusField.STOP_LIST] = mergeStatus(statuses, (status) => status.summary[eSummaryStatusField.STOP_LIST])

  return result
}
