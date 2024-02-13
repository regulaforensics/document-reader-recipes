import {
  AuthenticityCheckListContainer,
  AuthenticityFibersTypeCheckResult,
  AuthenticityIdentCheckResult,
  AuthenticityPhotoIdentCheckResult,
  AuthenticitySecurityFeatureCheckResult,
  eCheckDiagnose,
  eCheckResult,
  eResultType,
  ProcessResponse
} from '@regulaforensics/document-reader-typings'

import { RAuthenticityCheckListItem, RAuthenticityImageCheckListItem } from './models'


export const getAuthenticityCheckList = (input: ProcessResponse): RAuthenticityCheckListItem[] => {
  const containers = AuthenticityCheckListContainer.fromProcessResponse(input, false)
  const result: RAuthenticityCheckListItem[] = []

  containers.forEach((container) => {
    const isComparison = [eResultType.FINGER_PRINT_COMPARISON, eResultType.PORTRAIT_COMPARISON]
      .includes(container.result_type)

    const list = container.AuthenticityCheckList.List
    const current = RAuthenticityCheckListItem.fromPlain({
      page: container.page_idx || 1,
      images: []
    })

    list.forEach((item) => {
      if (AuthenticityFibersTypeCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {

        })
      }

      if (AuthenticityIdentCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {
          current.images.push(RAuthenticityImageCheckListItem.fromPlain({
            checkResult: subItem.ElementResult || eCheckResult.WAS_NOT_DONE,
            diagnose: subItem.ElementDiagnose || eCheckDiagnose.UNKNOWN,
            image: subItem.Image.image,
            referenceImage: subItem.EtalonImage.image,
            similarity: subItem.PercentValue || 0,
            type: subItem.ElementType,
          }))
        })
      }

      /*if (AuthenticityOCRSecurityTextCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {

        })
      }*/

      if (AuthenticityPhotoIdentCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {

        })
      }

      if (AuthenticitySecurityFeatureCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {

        })
      }

    })

    result.push(current)
  })

  return result.filter((item) => item.images.length > 0)
}
