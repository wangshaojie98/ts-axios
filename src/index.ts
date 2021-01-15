import { AxiosRequestConfig } from "./types"
import xhr from "./xhr"

function axios(config: AxiosRequestConfig) {
  xhr(config)
}

export default axios;

axios({
  url:'/simple',
  method: 'GET'
})
