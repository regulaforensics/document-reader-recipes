import { eAuthenticity, isObject } from '@regulaforensics/document-reader-typings'

import {
  iRAuthenticityIdentCheck,
  iRAuthenticityPhotoIdentCheck,
  iRAuthenticitySecurityCheck,
  RAuthenticityIdentCheck,
  RAuthenticityPhotoIdentCheck,
  RAuthenticitySecurityCheck,
} from './members'


/**
* Structure serves for storing the results of a single type
* document authenticity check
*/
export type uRAuthenticityCheck =
  RAuthenticityIdentCheck |
  RAuthenticityPhotoIdentCheck |
  RAuthenticitySecurityCheck

/**
* Structure serves for storing the results of a single type
* document authenticity check
*/
export type iuRAuthenticityCheck =
  iRAuthenticityIdentCheck |
  iRAuthenticityPhotoIdentCheck |
  iRAuthenticitySecurityCheck

/**
* Structure serves for storing the results of a single type
* document authenticity check
*/
export namespace uRAuthenticityCheck {
  /**
  * Transform list of unknown items to list of uAuthenticityCheckResult
  * @internal
  * @param {unknown[]} items - list of unknown items
  * @returns {uRAuthenticityCheck[]} - list of uAuthenticityCheckResult
  */
  export const transformList = (items: unknown[]): uRAuthenticityCheck[] => {
    const result: uRAuthenticityCheck[] = []

    items.forEach((item) => {
      if (!isObject(item) || !item.hasOwnProperty('checkType')) {
        return
      }

      // @ts-ignore
      const { checkType } = item

      switch (checkType) {
        case eAuthenticity.IMAGE_PATTERN:
        case eAuthenticity.IR_VISIBILITY:
        case eAuthenticity.OVI:
        case eAuthenticity.IR_LUMINESCENCE:
        case eAuthenticity.PORTRAIT_COMPARISON:
        case eAuthenticity.KINEGRAM:
        case eAuthenticity.LETTER_SCREEN:
        case eAuthenticity.HOLOGRAM_DETECTION:
        case eAuthenticity.FINGERPRINT_COMPARISON:
        case eAuthenticity.LIVENESS:
          result.push(RAuthenticityIdentCheck.fromPlain(item))
          break

        case eAuthenticity.IPI:
        case eAuthenticity.IR_PHOTO:
          result.push(RAuthenticityPhotoIdentCheck.fromPlain(item))
          break

        case eAuthenticity.UV_LUMINESCENCE:
        case eAuthenticity.IR_B900:
        case eAuthenticity.AXIAL_PROTECTION:
        case eAuthenticity.PHOTO_EMBED_TYPE:
        case eAuthenticity.HOLOGRAMS:
        case eAuthenticity.PHOTO_AREA:
        case eAuthenticity.BARCODE_FORMAT_CHECK:
        case eAuthenticity.EXTENDED_OCR_CHECK:
        case eAuthenticity.EXTENDED_MRZ_CHECK:
        case eAuthenticity.STATUS_ONLY:
          result.push(RAuthenticitySecurityCheck.fromPlain(item))
          break
      }
    })

    return result
  }
}
