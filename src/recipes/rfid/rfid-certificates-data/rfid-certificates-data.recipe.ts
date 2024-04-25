import { DocBinaryInfoContainer, eRfidCertificateType, ProcessResponse } from '@regulaforensics/document-reader-typings'

import { convertGeneralizedDateToLocal } from '@/helpers'
import { RRfidCertificate } from './models'


/**
* Get Rfid certificates data
* @param {ProcessResponse} input
* @param {string} [defaultValue='UNKNOWN'] - default value
* @returns {RRfidCertificate[]}
*/
export const getRfidCertificatesData = (input: ProcessResponse, defaultValue: string = 'UNKNOWN'): RRfidCertificate[] => {
  const binary = DocBinaryInfoContainer.fromProcessResponse(input)
  const result: RRfidCertificate[] = []

  binary.forEach((container) => {
    const sessionData = container.TDocBinaryInfo.RFID_BINARY_DATA.RFID_Session_Data

    sessionData.SecurityObjects.forEach((securityObject) => {
      securityObject.SignerInfos.forEach((signerInfo) => {
        signerInfo.CertificateChain.forEach((certificate) => {
          const current = new RRfidCertificate()

          current.certificateType = certificate.Type ?? eRfidCertificateType.UNDEFINED
          current.publicKeyAlgorithm = certificate.SubjectPKAlgorithm ?? defaultValue
          current.signatureAlgorithm = certificate.SignatureAlgorithm ?? defaultValue
          current.issuer = certificate.Issuer.FriendlyName.Data ?? defaultValue
          current.subject = certificate.Subject.FriendlyName.Data ?? defaultValue

          if (certificate.Validity.NotBefore.Data) {
            current.validFrom = convertGeneralizedDateToLocal(certificate.Validity.NotBefore.Data)
          } else {
            current.validFrom = defaultValue
          }

          if (certificate.Validity.NotAfter.Data) {
            current.validTo = convertGeneralizedDateToLocal(certificate.Validity.NotAfter.Data)
          } else {
            current.validTo = defaultValue
          }

          result.push(current)
        })
      })
    })
  })

  return result
}
