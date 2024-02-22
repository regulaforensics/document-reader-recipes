import { DocBinaryInfoContainer, ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RRfidCertificatesData } from './models'


/**
* Get Rfid certificates data
* @param {ProcessResponse} input
* @param {string} [defaultValue='UNKNOWN'] - default value
* @returns {RRfidCertificatesData}
*/
export const getRfidCertificatesData = (input: ProcessResponse, defaultValue: string = 'UNKNOWN'): RRfidCertificatesData => {
  const binary = DocBinaryInfoContainer.fromProcessResponse(input)
  const result = new RRfidCertificatesData()

  result.publicKeyAlgorithm = defaultValue
  result.signatureAlgorithm = defaultValue
  result.issuer = defaultValue
  result.subject = defaultValue
  result.validFrom = defaultValue



  binary.forEach((container) => {
    const sessionData = container.TDocBinaryInfo.RFID_BINARY_DATA.RFID_Session_Data

    sessionData.SecurityObjects.forEach((securityObject) => {
      securityObject.SignerInfos.forEach((signerInfo) => {
        const issuer = signerInfo.Issuer.FriendlyName.Data
        const signatureAlgorithm = signerInfo.SignatureAlgorithm
        const publicKeyAlgorithm = signerInfo.DigestAlgorithm
        const subject = signerInfo.SubjectKeyIdentifier.Data

        if (issuer) {
          result.issuer = issuer
        }

        if (signatureAlgorithm) {
          result.signatureAlgorithm = signatureAlgorithm
        }

        if (publicKeyAlgorithm) {
          result.publicKeyAlgorithm = publicKeyAlgorithm
        }

        if (subject) {
          result.subject = subject
        }

        signerInfo.CertificateChain.forEach((certificate) => {
          const validFrom = certificate.Validity.NotBefore.Data

          if (validFrom) {
            result.validFrom = validFrom
          }
        })
      })
    })
  })

  return result
}
