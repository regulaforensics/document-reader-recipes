import { eRfidErrorCodes } from '@regulaforensics/document-reader-typings'


export enum eDataGroupReadStatus {
  /**
  * Group exists but not read
  */
  NOT_PERFORMED = eRfidErrorCodes.ERROR_NOT_PERFORMED,

  /**
  * Group not exists
  */
  NOT_AVAILABLE = eRfidErrorCodes.ERROR_NOT_AVAILABLE,

  /**
  * Read without errors
  */
  NO_ERROR = eRfidErrorCodes.ERROR_NO_ERROR,

  /**
  * Read with errors
  */
  FAILED = eRfidErrorCodes.ERROR_FAILED
}
