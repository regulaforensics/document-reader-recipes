export enum eOpticalStatusField {
  /**
  * The check status if document type was recognized or not.
  */
  DOC_TYPE = 'DOC_TYPE',

  /**
  * The document validity period verification status.
  */
  EXPIRY = 'EXPIRY',

  /**
  * The input images quality verification status.
  */
  IMAGE_QA = 'IMAGE_QA',

  /**
  * MRZ verification: values validity, dates, checkdigits verification.
  */
  MRZ = 'MRZ',

  /**
  * The authenticity verification status.
  */
  SECURITY = 'SECURITY',

  /**
  * Text fields valitity: values validity for specific fields, cross-comparison of values from different sources,
  * dates & checkdigits verification.
  */
  TEXT = 'TEXT',
}
