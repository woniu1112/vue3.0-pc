import axios from 'axios'
// import { ElMessage } from 'element-plus'
import { toFeishu } from '@/utils/common'
import qs from 'qs'
import UUID from 'uuidjs'

const CancelToken = axios.CancelToken
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 接口请求超时时间
})

// 请求拦截
service.interceptors.request.use(
    (config) => {
        const uuid = UUID.parse(UUID.generate())
        config.headers.traceId = uuid?.hexFields?.node
        config.params = { ...config.params }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截
service.interceptors.response.use(
    (res) => {
        if (res.data.code) {
            if (res.data.code === 100200) {
                return Promise.resolve(res.data)
            } else if (res.data.code === 100302) {
                // ElMessage({
                //     showClose: true,
                //     message: res.data.msg,
                //     type: 'error'
                // })
                const url = res && res.data && res.data.msg
                toFeishu(url)
            } else {
                // ElMessage({
                //     showClose: true,
                //     message: res.data.msg,
                //     type: 'error'
                // })
                return Promise.resolve(res.data.msg)
            }
        } else {
            return Promise.resolve(res.data)
        }
    },
    (error) => {
        if (error.message !== 'cancel') {
            // ElMessage({
            //     showClose: true,
            //     message: '请求超时,请稍后再试',
            //     type: 'error'
            // })
        }

        return Promise.resolve(error)
    }
)
export default function(obj) {
    const { url, method = 'get', params, data, responseType } = obj
    return service({
        url: url,
        method: method,
        params: params,
        paramsSerializer: function(params) {
            return qs.stringify(params, { arrayFormat: 'indices' })
        },
        data: data,
        responseType: responseType || '',
        cancelToken: new CancelToken(cancel => {
            if (window.$cancelAxios) {
                window.$cancelAxios.push({ cancel })
            } else {
                window.$cancelAxios = [{ cancel }]
            }
        })
    })
}

