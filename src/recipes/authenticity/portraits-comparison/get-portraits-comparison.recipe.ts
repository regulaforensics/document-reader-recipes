import {
  AuthenticityCheckListContainer,
  AuthenticityIdentCheckResult,
  eAuthenticity,
  eSecurityFeatureType,
  ProcessResponse
} from '@regulaforensics/document-reader-typings'

import { ePortraitComparisonSource, RPortraitComparisonComparable, RPortraitsComparison, } from './models'


export const getPortraitsComparison = (input: ProcessResponse): RPortraitsComparison[] => {
  const containers = AuthenticityCheckListContainer.fromProcessResponse(input)
  const result: RPortraitsComparison[] = []

  containers.forEach((container) => {
    const list = container.AuthenticityCheckList.List

    list.forEach((item) => {
      if (AuthenticityIdentCheckResult.isBelongs(item)) {
        if (item.Type !== eAuthenticity.PORTRAIT_COMPARISON) {
          return
        }

        item.List.forEach((subItem) => {
          if (![
            eSecurityFeatureType.PORTRAIT_COMPARISON_VS_CAMERA,
            eSecurityFeatureType.PORTRAIT_COMPARISON_RFID_VS_CAMERA,
            eSecurityFeatureType.PORTRAIT_COMPARISON_EXT_VS_VISUAL,
            eSecurityFeatureType.PORTRAIT_COMPARISON_EXT_VS_RFID,
            eSecurityFeatureType.PORTRAIT_COMPARISON_EXT_VS_CAMERA,
            eSecurityFeatureType.PORTRAIT_COMPARISON_EXT_VS_BARCODE,
            eSecurityFeatureType.PORTRAIT_COMPARISON_BARCODE_VS_CAMERA,
          ].includes(subItem.ElementType)) {
            return
          }

          let left: ePortraitComparisonSource
          let right: ePortraitComparisonSource

          switch (subItem.ElementType) {
            case eSecurityFeatureType.PORTRAIT_COMPARISON_VS_CAMERA:
              left = ePortraitComparisonSource.PORTRAIT
              right = ePortraitComparisonSource.CAMERA
              break
            case eSecurityFeatureType.PORTRAIT_COMPARISON_RFID_VS_CAMERA:
              left = ePortraitComparisonSource.RFID
              right = ePortraitComparisonSource.CAMERA
              break
            case eSecurityFeatureType.PORTRAIT_COMPARISON_EXT_VS_VISUAL:
              left = ePortraitComparisonSource.EXTERNAL
              right = ePortraitComparisonSource.VISUAL
              break
            case eSecurityFeatureType.PORTRAIT_COMPARISON_EXT_VS_RFID:
              left = ePortraitComparisonSource.EXTERNAL
              right = ePortraitComparisonSource.RFID
              break
            case eSecurityFeatureType.PORTRAIT_COMPARISON_EXT_VS_CAMERA:
              left = ePortraitComparisonSource.EXTERNAL
              right = ePortraitComparisonSource.CAMERA
              break
            case eSecurityFeatureType.PORTRAIT_COMPARISON_EXT_VS_BARCODE:
              left = ePortraitComparisonSource.EXTERNAL
              right = ePortraitComparisonSource.BARCODE
              break
            default:
              left = ePortraitComparisonSource.BARCODE
              right = ePortraitComparisonSource.CAMERA
              break
          }

          let index = result.findIndex((item) => item.source === left)

          if (index === -1) {
            result.push(RPortraitsComparison.fromPlain({
              source: left,
              comparable: [],
              image: subItem.EtalonImage.image
            }))

            index = result.length - 1
          }

          result[index].comparable.push(
            RPortraitComparisonComparable.fromPlain({
              source: right,
              checkResult: subItem.ElementResult,
              similarity: subItem.PercentValue,
              image: subItem.Image.image
            })
          )
        })
      }
    })
  })

  return result
}
