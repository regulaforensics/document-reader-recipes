import { OneCandidateContainer, ProcessResponse } from '@regulaforensics/document-reader-typings'

import { RDocumentIdentification } from './models'


/**
* Returns document identification from process response
* @param {ProcessResponse} input
* @param {false} allowDefault
* @param {string|undefined} defaultDocumentName
* @returns {RDocumentIdentification|undefined}
*/
export function getDocumentIdentification(
  input: ProcessResponse,
  allowDefault?: false,
  defaultDocumentName?: string
): RDocumentIdentification | undefined;

/**
* Returns document identification from process response
* @param {ProcessResponse} input
* @param {true} allowDefault
* @param {string|undefined} defaultDocumentName
* @returns {RDocumentIdentification}
*/
export function getDocumentIdentification(
  input: ProcessResponse,
  allowDefault?: true,
  defaultDocumentName?: string
): RDocumentIdentification;

/**
* Returns document identification from process response
* @param {ProcessResponse} input
* @param {boolean} allowDefault
* @param {string|undefined} defaultDocumentName
* @returns {RDocumentIdentification | undefined}
*/
export function getDocumentIdentification(
  input: ProcessResponse,
  allowDefault: boolean = false,
  defaultDocumentName: string = 'UNKNOWN'
): RDocumentIdentification | undefined {
  const containers = OneCandidateContainer.fromProcessResponse(input, false)

  for (let i = 0; i < containers.length; i++) {
    const container = containers[i]

    if (container.OneCandidate?.DocumentName) {
      return RDocumentIdentification.fromPlain({
        documentName: container.OneCandidate.DocumentName,
        pageIndex: container.page_idx || 1,
      })
    }
  }

  return allowDefault
    ? RDocumentIdentification.fromPlain({
        documentName: defaultDocumentName,
        pageIndex: 1,
      })
    : undefined
}
