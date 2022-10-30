/**
 * Generating a unique id
 * code to check for uniqueness:
 *  
 *  const size = 1000000
 *  const set = new Set(new Array(size)
 *       .fill(0)
 *      .map(() => uid()))
 *
 *   console.log(
 *       size === set.size ? 'all ids are unique' : `not unique records ${size - set.size}`
 *  )
 * link: https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13#comment-1ol48
 */
export const uid = () => String(Date.now().toString(36) + Math.random().toString(16)).replace(/\./g, '');
