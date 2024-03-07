import {
  AuthenticityCheckListContainer,
  AuthenticityIdentCheckResult,
  AuthenticityPhotoIdentCheckResult,
  AuthenticitySecurityFeatureCheckResult,
  eAuthenticity,
  eCheckDiagnose,
  eCheckResult,
  eSecurityFeatureType,
  ProcessResponse,
  StatusContainer
} from '@regulaforensics/document-reader-typings'

import {
  RAuthenticityBarcodeCheckListItem,
  RAuthenticityCheckListItem,
  RAuthenticityImageCheckListItem,
  RAuthenticityIpiCheckListItem
} from './models'


export const getAuthenticityCheckList = (input: ProcessResponse): RAuthenticityCheckListItem[] => {
  const containers = AuthenticityCheckListContainer.fromProcessResponse(input)
  const statutes = StatusContainer.fromProcessResponse(input)
  const result: RAuthenticityCheckListItem[] = []

  const checkResult = statutes.length ? statutes[0].Status.overallStatus : eCheckResult.WAS_NOT_DONE

  containers.forEach((container) => {
    const list = container.AuthenticityCheckList.List
    const current = RAuthenticityCheckListItem.fromPlain({
      checkResult,
      page: container.page_idx ?? 0,
      images: [],
      ipi: [],
      barcode: [],
    })

    list.forEach((item) => {
      /*
      if (AuthenticityFibersTypeCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {

        })
      }
      */

      if (AuthenticityIdentCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {
          current.images.push(RAuthenticityImageCheckListItem.fromPlain({
            checkResult: subItem.ElementResult ?? eCheckResult.WAS_NOT_DONE,
            diagnose: subItem.ElementDiagnose ?? eCheckDiagnose.UNKNOWN,
            image: subItem.Image.image,
            referenceImage: subItem.EtalonImage.image,
            similarity: subItem.PercentValue ?? 0,
            type: subItem.ElementType,
          }))
        })
      }

      /*
      if (AuthenticityOCRSecurityTextCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {

        })
      }
      */

      if (AuthenticityPhotoIdentCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {
          if (subItem.Type === eAuthenticity.IPI) {
            if (subItem.ResultImages?.Images?.length) {
              current.ipi.push(RAuthenticityIpiCheckListItem.fromPlain({
                checkResult: subItem.ElementResult ?? eCheckResult.WAS_NOT_DONE,
                diagnose: subItem.ElementDiagnose ?? eCheckDiagnose.UNKNOWN,
                image: subItem.ResultImages.Images[0].image,
              }))
            }
          }
        })
      }

      if (AuthenticitySecurityFeatureCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {
          if (subItem.Type === eAuthenticity.BARCODE_FORMAT_CHECK) {
            current.barcode.push(RAuthenticityBarcodeCheckListItem.fromPlain({
              checkResult: subItem.ElementResult ?? eCheckResult.WAS_NOT_DONE,
              diagnose: subItem.ElementDiagnose ?? eCheckDiagnose.UNKNOWN,
              feature: subItem.ElementType ?? eSecurityFeatureType.BLANK,
            }))
          }
        })
      }

    })

    result.push(current)
  })

  return result.filter((item) => item.images.length > 0 || item.ipi.length > 0 || item.barcode.length > 0)
}
