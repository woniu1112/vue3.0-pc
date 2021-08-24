/**
 *
 * @param {*} UA ,就是userAgent
 * @returns  type: 设备类型
 *           env: 访问环境(微信/微博/qq)
 *           masklayer: 就是给外部拿到判断是否显示遮罩层的,一些特殊环境要引导用户到外部去打开访问
 */
function isWechat(UA) {
    return !!/MicroMessenger/i.test(UA)
}
function isWeibo(UA) {
    return !!/Weibo/i.test(UA)
}
function isQQ(UA) {
    return !!/QQ/i.test(UA)
}
function isMoible(UA) {
    return !!/(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(UA)
}
function isIOS(UA) {
    return !!/iPhone|iPad|iPod/i.test(UA)
}
function isAndroid(UA) {
    return !!/Android/i.test(UA)
}
export function isUnique(UA) {
    const ind = UA.indexOf('unique_id')
    if (ind > -1) {
        const val = UA.slice(ind)
        const unique_id = val.split('=')[1]
        return unique_id
    } else {
        return false
    }
}
export function deviceType(UA) {
    if (isMoible(UA)) {
        if (isIOS(UA)) {
            if (isWechat(UA)) {
                return {
                    type: 'ios',
                    env: 'wechat',
                    masklayer: true
                }
            }
            if (isWeibo(UA)) {
                return {
                    type: 'ios',
                    env: 'weibo',
                    masklayer: true
                }
            }
            if (isQQ(UA)) {
                return {
                    type: 'ios',
                    env: 'qq',
                    masklayer: true
                }
            }
            return {
                type: 'ios'
            }
        }
        if (isAndroid(UA)) {
            if (isWechat(UA)) {
                return {
                    type: 'android',
                    env: 'wechat',
                    masklayer: true
                }
            }
            if (isWeibo(UA)) {
                return {
                    type: 'android',
                    env: 'weibo',
                    masklayer: true
                }
            }
            if (isQQ(UA)) {
                return {
                    type: 'android',
                    env: 'qq',
                    masklayer: true
                }
            }
            return {
                type: 'android'
            }
        }

        return {
            type: 'mobile'
        }
    } else {
        return {
            type: 'pc'
        }
    }
}
