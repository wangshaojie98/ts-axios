import { AxiosRequestConfig, AxiosResponse } from "./types"
import xhr from "./xhr"
import { buildURL } from "./helpers/url"
import { transformRequest, transformResponse } from "./helpers/data"
import { processHeaders } from "./helpers/header"

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config);
  // debugger
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url, params);
}

function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config;
  return transformRequest(data);

}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);

}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data);
  return res
}
export default axios;
