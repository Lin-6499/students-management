// utils/geolocation.ts
export interface GeolocationPosition {
  latitude: number
  longitude: number
  accuracy?: number
}

declare global {
  interface Window {
    AMap: any;
  }
}

/**
 * 使用高德地图 JS API 获取当前位置（兼容 Chrome 国内环境）
 */
export function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
      // 检查高德地图是否已加载
    if (typeof window === 'undefined' || !window.AMap) {
      reject(new Error('高德地图 SDK 未加载，请检查 index.html 中是否引入了 AMap 脚本'))
      return
    }

    // 使用高德定位插件获取位置  底层还是靠 navigator.geolocation（浏览器原生定位）
    window.AMap.plugin('AMap.Geolocation', () => {
      const geolocation = new window.AMap.Geolocation({
        enableHighAccuracy: false, // 高精度（GPS + WiFi）
        timeout: 8000,            // 8秒超时
        maximumAge: 0,            // 不使用缓存
        showButton: false,        // 不显示地图上的定位按钮
        extensions: 'all'         // 返回详细地址信息（虽然后端会再解析）
      })
      // 发起定位请求 高德调用内部浏览器 navigator.geolocation
      geolocation.getCurrentPosition(
        (status: string, result: any) => {
          if (status === 'complete' && result.position) {
            resolve({
              latitude: result.position.lat,
              longitude: result.position.lng,
              accuracy: result.accuracy
            })
          } else {
            // 高德返回的错误信息
            const msg = result.message || '高德定位失败'
            reject(new Error(`定位失败: ${msg}`))
          }
        },
        (err: any) => {
          reject(new Error(`高德定位异常: ${err.message || '未知错误'}`))
        }
      )
    })
  })
}
// 高德IP定位
export async function getLocationByIP() {
  try {
    const response = await fetch(
      `https://restapi.amap.com/v3/ip?key=e45c598b6700af6919375e99bc25a1ad`
    )
    const data = await response.json()
    if (data.status === '1') {
      return getCenterFromRectangle(data.rectangle)
    } else {
      throw new Error(data.info || '高德 IP 定位返回异常')
    }
  } catch (error) {
    throw new Error(`IP 定位请求失败: ${error.message}`)
  }
}
export function isChrome() {
  // 获取浏览器标识
  const ua = navigator.userAgent;
  // 检查是否包含 Chrome，但不包含常见的 Chromium 衍生浏览器标识
  return (
    // 检查是否包含字段 test
    /Chrome/.test(ua) &&
    !/Edg/.test(ua) &&      // 排除 Microsoft Edge
    !/OPR/.test(ua) &&      // 排除 Opera
    !/Brave/.test(ua) &&    // 排除 Brave（可选）
    !/Vivaldi/.test(ua)     // 排除 Vivaldi（可选）
  );
}
// 根据矩形区域范围 得到中心值来代替经纬度
function getCenterFromRectangle(rect: string) {
  const [sw, ne] = rect.split(';')
  const [lng1, lat1] = sw!.split(',').map(Number)
  const [lng2, lat2] = ne!.split(',').map(Number)
  return {
    lng: (lng1! + lng2!) / 2,
    lat: (lat1! + lat2!) / 2
  }
}

