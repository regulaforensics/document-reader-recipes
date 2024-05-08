import {
  AuthenticityCheckListContainer, AuthenticityFibersTypeCheckResult,
  AuthenticityIdentCheckResult, AuthenticityOCRSecurityTextCheckResult,
  AuthenticityPhotoIdentCheckResult,
  AuthenticitySecurityFeatureCheckResult,
  eAuthenticity,
  eCheckDiagnose,
  eCheckResult,
  eLights,
  eSecurityFeatureType,
  ProcessResponse,
  StatusContainer, type tAuthenticityFibersTypeCheckResultType
} from '@regulaforensics/document-reader-typings'

import {
  RAuthenticityIdentCheck,
  RAuthenticityPhotoIdentCheck,
  RAuthenticitySecurityCheck, RAuthenticityTextCheck,
  RAuthenticityCheckGroupsItem, RAuthenticityCheckGroup, uRAuthenticityCheck, RAuthenticityFibersCheck, iRLocation
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

export const getAuthenticityCheckList = (input: ProcessResponse): RAuthenticityCheckGroupsItem[] => {
  const containers = AuthenticityCheckListContainer.fromProcessResponse(input)
  const result: RAuthenticityCheckGroupsItem[] = []

  containers.forEach((container) => {
    const list = container.AuthenticityCheckList.List
    const current = RAuthenticityCheckGroupsItem.fromPlain({
      checkResult: eCheckResult.WAS_NOT_DONE,
      page: container.page_idx ?? 0,
      groups: [],
    })

    list.forEach((item) => {
      if (item.Result === eCheckResult.OK || item.Result === eCheckResult.WAS_NOT_DONE) {
        current.checkResult = eCheckResult.OK
      } else if (item.Result === eCheckResult.ERROR) {
        current.checkResult = eCheckResult.ERROR
      }

      if (AuthenticityFibersTypeCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {
          let groupIndex = current.groups.findIndex((group) => group.group === subItem.Type)

          if (groupIndex === -1) {
            current.groups.push(RAuthenticityCheckGroup.fromPlain({
              group: subItem.Type,
              checkResult: eCheckResult.WAS_NOT_DONE,
              checks: []
            }))

            groupIndex = current.groups.length - 1
          }

          current.groups[groupIndex].checks.push(RAuthenticityFibersCheck.fromPlain({
            checkType: subItem.Type,
            location: {
              light: undefined,
              rect: subItem.RectArray,
            },
            diagnose: subItem.ElementDiagnose ?? eCheckDiagnose.UNKNOWN,
            checkResult: subItem.ElementResult ?? eCheckResult.WAS_NOT_DONE,
          }))
        })
      }

      if (AuthenticityIdentCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {
          const light = subItem.LightIndex

          if (subItem.ElementType === eSecurityFeatureType.PORTRAIT_COMPARISON_VS_CAMERA) {
            // skip portrait vs camera check
            return
          }

          let groupIndex = current.groups.findIndex((group) => group.group === subItem.Type)

          if (groupIndex === -1) {
            current.groups.push(RAuthenticityCheckGroup.fromPlain({
              group: subItem.Type,
              checkResult: eCheckResult.WAS_NOT_DONE,
              checks: []
            }))

            groupIndex = current.groups.length - 1
          }

          current.groups[groupIndex].checks.push(RAuthenticityIdentCheck.fromPlain({
            checkType: subItem.Type,
            checkResult: subItem.ElementResult ?? eCheckResult.WAS_NOT_DONE,
            diagnose: subItem.ElementDiagnose ?? eCheckDiagnose.UNKNOWN,
            image: subItem.Image.image,
            referenceImage: subItem.EtalonImage.image,
            similarity: subItem.PercentValue ?? 0,
            type: subItem.ElementType,
            location: light === eLights.OFF ? undefined : {
              light,
              rect: [subItem.Area],
            }
          }))
        })
      }

      if (AuthenticityOCRSecurityTextCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {
          let groupIndex = current.groups.findIndex((group) => group.group === subItem.Type)

          if (groupIndex === -1) {
            current.groups.push(RAuthenticityCheckGroup.fromPlain({
              group: subItem.Type,
              checkResult: eCheckResult.WAS_NOT_DONE,
              checks: []
            }))

            groupIndex = current.groups.length - 1
          }

          current.groups[groupIndex].checks.push(RAuthenticityTextCheck.fromPlain({
            checkType: subItem.Type,
            checkResult: subItem.ElementResult ?? eCheckResult.WAS_NOT_DONE,
            type: subItem.EtalonFieldType,
            diagnose: subItem.ElementDiagnose ?? eCheckDiagnose.UNKNOWN,
            location: {
                light: subItem.LightType,
                rect: [subItem.EtalonFieldRect],
              }
          }))
        })
      }

      if (AuthenticityPhotoIdentCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {
          const light = subItem.LightIndex

          if (subItem.ResultImages?.Images?.length) {
            let groupIndex = current.groups.findIndex((group) => group.group === subItem.Type)

            if (groupIndex === -1) {
              current.groups.push(RAuthenticityCheckGroup.fromPlain({
                group: subItem.Type,
                checkResult: eCheckResult.WAS_NOT_DONE,
                checks: []
              }))

              groupIndex = current.groups.length - 1
            }

            current.groups[groupIndex].checks.push(RAuthenticityPhotoIdentCheck.fromPlain({
              checkType: subItem.Type,
              checkResult: subItem.ElementResult ?? eCheckResult.WAS_NOT_DONE,
              diagnose: subItem.ElementDiagnose ?? eCheckDiagnose.UNKNOWN,
              image: subItem.ResultImages.Images[0].image,
              location: light === eLights.OFF ? undefined : {
                light,
                rect: [subItem.Area],
              }
            }))
          }
        })
      }

      if (AuthenticitySecurityFeatureCheckResult.isBelongs(item)) {
        item.List.forEach((subItem) => {
          let groupIndex = current.groups.findIndex((group) => group.group === subItem.Type)

          if (groupIndex === -1) {
            current.groups.push(RAuthenticityCheckGroup.fromPlain({
              group: subItem.Type,
              checkResult: eCheckResult.WAS_NOT_DONE,
              checks: []
            }))

            groupIndex = current.groups.length - 1
          }

          current.groups[groupIndex].checks.push(RAuthenticitySecurityCheck.fromPlain({
            checkType: subItem.Type,
            checkResult: subItem.ElementResult ?? eCheckResult.WAS_NOT_DONE,
            diagnose: subItem.ElementDiagnose ?? eCheckDiagnose.UNKNOWN,
            feature: subItem.ElementType ?? eSecurityFeatureType.BLANK,
            location: {
                light: undefined,
                rect: [subItem.ElementRect],
              }
          }))
        })
      }
    })

    current.groups.forEach((group, index) => {
      group.checks.sort((a, b) => a.checkResult - b.checkResult)

      if (group.checks.every(({ checkResult }) => checkResult === eCheckResult.OK)) {
        current.groups[index].checkResult = eCheckResult.OK
        return
      }

      if (group.checks.some(({ checkResult }) => checkResult === eCheckResult.WAS_NOT_DONE)) {
        current.groups[index].checkResult = eCheckResult.WAS_NOT_DONE
        return
      }

      current.groups[index].checkResult = eCheckResult.ERROR
    })

    current.groups.sort((a, b) => a.checkResult - b.checkResult)

    result.push(current)
  })

  return result
    .sort((a, b) => a.page - b.page)
}
