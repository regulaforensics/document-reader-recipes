import {
  AuthenticityCheckListContainer,
  AuthenticityFibersTypeCheckResult,
  AuthenticityIdentCheckResult,
  AuthenticityOCRSecurityTextCheckResult,
  AuthenticityPhotoIdentCheckResult,
  AuthenticitySecurityFeatureCheckResult,
  eCheckDiagnose,
  eCheckResult,
  eLights,
  eSecurityFeatureType,
  ProcessResponse
} from '@regulaforensics/document-reader-typings'

import {
  RAuthenticityCheckGroup,
  RAuthenticityCheckGroupsItem,
  RAuthenticityFibersCheck,
  RAuthenticityIdentCheck,
  RAuthenticityPhotoIdentCheck,
  RAuthenticitySecurityCheck,
  RAuthenticityTextCheck
} from './models'


const skipFeatures = [
  eSecurityFeatureType.PORTRAIT_COMPARISON_VS_CAMERA,
  eSecurityFeatureType.PORTRAIT_COMPARISON_RFID_VS_CAMERA,
  eSecurityFeatureType.PORTRAIT_COMPARISON_EXT_VS_VISUAL,
  eSecurityFeatureType.PORTRAIT_COMPARISON_EXT_VS_RFID,
  eSecurityFeatureType.PORTRAIT_COMPARISON_EXT_VS_CAMERA,
  eSecurityFeatureType.PORTRAIT_COMPARISON_EXT_VS_BARCODE,
  eSecurityFeatureType.PORTRAIT_COMPARISON_BARCODE_VS_CAMERA,
]

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
            colorValues: subItem.ColorValues,
            rectCount: subItem.RectCount,
            expectedCount: subItem.ExpectedCount,
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

          if (skipFeatures.includes(subItem.ElementType)) {
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
            location: {
              light,
              rect: [subItem.Area],
            }
          }))
        })
      }

      if (AuthenticityOCRSecurityTextCheckResult.isBelongs(item)) {
        let groupIndex = current.groups.findIndex((group) => group.group === item.Type)

        item.List.forEach((subItem) => {
          if (groupIndex === -1) {
            current.groups.push(RAuthenticityCheckGroup.fromPlain({
              group: subItem.Type,
              checkResult: eCheckResult.WAS_NOT_DONE,
              checks: []
            }))

            groupIndex = current.groups.length - 1
          }

          current.groups[groupIndex].checks.push(RAuthenticityTextCheck.fromPlain({
            reference: {
              type: subItem.EtalonResultType,
              reference: subItem.EtalonResultOCR,
              result: subItem.SecurityTextResultOCR,
              location: {
                light: subItem.EtalonLightType,
                rect: [subItem.EtalonFieldRect],
              }
            },
            checkType: subItem.Type,
            checkResult: subItem.ElementResult ?? eCheckResult.WAS_NOT_DONE,
            type: subItem.EtalonFieldType,
            diagnose: subItem.ElementDiagnose ?? eCheckDiagnose.UNKNOWN,
            location: {
              light: subItem.LightType,
              rect: [subItem.FieldRect],
            }
          }))
        })

        if (!item.List?.length) {
          current.groups.push(RAuthenticityCheckGroup.fromPlain({
            group: item.Type,
            checkResult: item.Result,
            checks: []
          }))
        }
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
        let groupIndex = current.groups.findIndex((group) => group.group === item.Type)

        item.List.forEach((subItem) => {
          if (skipFeatures.includes(subItem.ElementType)) {
            return
          }

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

        if (!item.List?.length) {
          current.groups.push(RAuthenticityCheckGroup.fromPlain({
            group: item.Type,
            checkResult: item.Result,
            checks: []
          }))
        }
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

    if (current.groups.every(({ checkResult }) => checkResult === eCheckResult.OK)) {
      current.checkResult = eCheckResult.OK
    } else if (current.groups.some(({ checkResult }) => checkResult === eCheckResult.WAS_NOT_DONE)) {
      current.checkResult = eCheckResult.WAS_NOT_DONE
      return
    } else {
      current.checkResult = eCheckResult.ERROR
    }

    current.groups.sort((a, b) => a.checkResult - b.checkResult)

    result.push(current)
  })

  return result
    .sort((a, b) => a.page - b.page)
}
