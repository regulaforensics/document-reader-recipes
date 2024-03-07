export enum eSummaryStatusField {
  /**
  * The summary of all optical checks.
  */
  OPTICAL = 'optical',

  /**
  * The comparison status for portrait in the document against the live or external image.
  */
  PORTRAIT = 'portrait',

  /**
  * The summary of all RFID checks.
  */
  RFID = 'rfid',

  /**
  * The verification status for the document data against the database.
  */
  STOP_LIST = 'stopList'
}
