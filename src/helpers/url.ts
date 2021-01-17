import { isDate, isPlainObject } from './utils'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any):string {
  // 1.判断空值
  if (!params) {
    return url;
  }

  const parts: string [] = [];

  /**
   * params = {
   *    name: 'wsj',
   *    age: '24'
   * }
   */

  // 转换params[key]类型为Date或者Object的值
  Object.keys(params).forEach(key => {
    let val = params[key];
    // 判断空
    if (val === null || typeof val === 'undefined') {
      return; // 执行下次循环
    }

    // 判断数组,如果是就赋值，如果不是转成数组
    let values: any [];
    if (Array.isArray(val)) {
      values = val;
      key += '[]'
    } else {
      values = [val]
    }

    // 判断并转换日期和对象，并编码
    values.forEach(val => {
      if (isDate(val) === true) {
        val = val.toISOString();
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val);
      }

      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  // 拼接参数，并判断特殊情况
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf("#")
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf("?") === -1 ? '?' : '&') + serializedParams;
  }

  return url
}