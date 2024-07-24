import { eCheckResult } from '@regulaforensics/document-reader-typings'


export const mergeStatuses = (checks: eCheckResult[]): eCheckResult => {
  let result: eCheckResult = eCheckResult.WAS_NOT_DONE

  for (const check of checks) {
    if (check === eCheckResult.ERROR) {
      return eCheckResult.ERROR
    }

    if (result === eCheckResult.WAS_NOT_DONE && check === eCheckResult.OK) {
      result = eCheckResult.OK
    }
  }

  return result
}