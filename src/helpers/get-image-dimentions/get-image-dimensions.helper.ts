import { iImageDimensions } from './interfaces'


/**
* Get image dimensions
* @param {string} url - image url
* @returns {Promise<iImageDimensions>}
*/
export const getImageDimensions = (url: string): Promise<iImageDimensions> => {
  return new Promise (function (resolve, reject) {
    if (typeof window === 'undefined') {
      resolve({ width: 0, height: 0 })
      return
    }

    const i = new Image()

    i.onload = () => {
      resolve({ width: i.width, height: i.height })
    }

    i.onerror = (e) => {
      reject(e)
    }

    i.src = url
  })
}
