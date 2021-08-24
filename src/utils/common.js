// url识别
export function urlDistinguish(str) {
    var reg = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
    str = str.replace(reg, "<a href='$1' class='jump' target='_blank'>$1</a>")
    return str
}
// 判断浏览器类型
export function myBrowser() {
    const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
    const isOpera = userAgent.indexOf('Opera') > -1 // 判断是否Opera浏览器
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera // 判断是否IE浏览器
    const isEdge = userAgent.indexOf('Edge') > -1 // 判断是否IE的Edge浏览器
    const isFF = userAgent.indexOf('Firefox') > -1 // 判断是否Firefox浏览器
    const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1 // 判断是否Safari浏览器
    const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 // 判断Chrome浏览器
    if (isIE) {
        return 'IE'
    }
    if (isOpera) {
        return 'Opera'
    }
    if (isEdge) {
        return 'Edge'
    }
    if (isFF) {
        return 'Firefox'
    }
    if (isSafari) {
        return 'Safari'
    }
    if (isChrome) {
        return 'Chrome'
    }
}
// 当前设备
export const deviceIs = () => {
    const ua = navigator.userAgent
    const isWindowsPhone = /(?:Windows Phone)/.test(ua)
    const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
    const isAndroid = /(?:Android)/.test(ua)
    const isFireFox = /(?:Firefox)/.test(ua)
    const isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
    const isPhone = /(?:iPhone)/.test(ua) && !isTablet
    const isPc = !isPhone && !isAndroid && !isSymbian
    return {
        isTablet: isTablet, // 平板
        isPhone: isPhone, // 手机
        isAndroid: isAndroid, // 手机
        isPc: isPc // pc
    }
}

// 时间戳转日期格式
export function timestampToTime(timestamp) {
    return new Date(parseInt(timestamp) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, ' ')
}

/**
 * 取消之前的请求
 */
export const cancelAxios = () => {
    window.$cancelAxios.forEach(ele => {
        ele.cancel('cancel')
    })
    window.$cancelAxios = []
}
