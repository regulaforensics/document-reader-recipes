import {
  AuthenticityCheckListContainer,
  AuthenticityIdentCheckResult,
  AuthenticityPhotoIdentCheckResult,
  AuthenticitySecurityFeatureCheckResult,
  eAuthenticity,
  eCheckDiagnose,
  eCheckResult,
  eLights,
  eSecurityFeatureType,
  ProcessResponse,
  StatusContainer
} from '@regulaforensics/document-reader-typings'

import {
  RAuthenticityCheckListItem,
  RAuthenticityIdentCheck,
  RAuthenticityPhotoIdentCheck,
  RAuthenticitySecurityCheck,
} from './models'


const getLight = (checkType: eAuthenticity): eLights => {
  switch (checkType) {
    case eAuthenticity.UV_LUMINESCENCE:
      return eLights.UV
    case eAuthenticity.IR_B900:
      return eLights.IR_FULL
    case eAuthenticity.PHOTO_EMBED_TYPE:
    case eAuthenticity.EXTENDED_MRZ_CHECK:
    case eAuthenticity.OCR_SECURITY_TEXT:
      return eLights.WHITE_FULL
  }

  return eLights.OFF
}

export const getAuthenticityCheckList = (input: ProcessResponse): RAuthenticityCheckListItem[] => {
  const containers = AuthenticityCheckListContainer.fromProcessResponse(input)
  const result: RAuthenticityCheckListItem[] = []

  containers.forEach((container) => {
    const list = container.AuthenticityCheckList.List
    const current = RAuthenticityCheckListItem.fromPlain({
      checkResult: eCheckResult.WAS_NOT_DONE,
      page: container.page_idx ?? 0,
      checks: [],
    })

    list.forEach((item) => {
      if (item.Result === eCheckResult.OK || item.Result === eCheckResult.WAS_NOT_DONE) {
        current.checkResult = eCheckResult.OK
      } else if (item.Result === eCheckResult.ERROR) {
        current.checkResult = eCheckResult.ERROR
      }

      /*
      if (AuthenticityFibersTypeCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {

        })
      }
      */

      if (AuthenticityIdentCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {
          const light = subItem.LightIndex

          if (subItem.ElementType === eSecurityFeatureType.PORTRAIT_COMPARISON_VS_CAMERA) {
            // skip portrait vs camera check
            return
          }

          current.checks.push(RAuthenticityIdentCheck.fromPlain({
            checkType: subItem.Type,
            checkResult: subItem.ElementResult ?? eCheckResult.WAS_NOT_DONE,
            diagnose: subItem.ElementDiagnose ?? eCheckDiagnose.UNKNOWN,
            image: subItem.Image.image,
            referenceImage: subItem.EtalonImage.image,
            similarity: subItem.PercentValue ?? 0,
            type: subItem.ElementType,
            location: light === eLights.OFF ? undefined : {
              light,
              rect: subItem.Area,
            }
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
          const light = subItem.LightIndex

          if (subItem.ResultImages?.Images?.length) {
            current.checks.push(RAuthenticityPhotoIdentCheck.fromPlain({
              checkType: subItem.Type,
              checkResult: subItem.ElementResult ?? eCheckResult.WAS_NOT_DONE,
              diagnose: subItem.ElementDiagnose ?? eCheckDiagnose.UNKNOWN,
              image: subItem.ResultImages.Images[0].image,
              location: light === eLights.OFF ? undefined : {
                light,
                rect: subItem.Area,
              }
            }))
          }
        })
      }

      if (AuthenticitySecurityFeatureCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {

          current.checks.push(RAuthenticitySecurityCheck.fromPlain({
            checkType: subItem.Type,
            checkResult: subItem.ElementResult ?? eCheckResult.WAS_NOT_DONE,
            diagnose: subItem.ElementDiagnose ?? eCheckDiagnose.UNKNOWN,
            feature: subItem.ElementType ?? eSecurityFeatureType.BLANK,
            location: {
                light: eLights.OFF,
                rect: subItem.ElementRect,
              }
          }))
        })
      }

    })

    result.push(current)
  })

  return result.filter((item) => item.checks.length > 0)
}
