import BaseComponent from './baseComponent'

class AddressComponent extends BaseComponent {
  constructor () {
    super()
    this.tencentkey = 'ZO4BZ-LKJRP-I5ZD5-LUL2T-BMTCQ-AIFU6'
    // RLHBZ-WMPRP-Q3JDS-V2IQA-JNRFH-EJBHL'
		this.tencentkey2 = 'RRXBZ-WC6KF-ZQSJT-N2QU7-T5QIT-6KF5X'
		this.tencentkey3 = 'OHTBZ-7IFRG-JG2QF-IHFUK-XTTK6-VXFBN'
		this.tencentkey4 = 'Z2BBZ-QBSKJ-DFUFG-FDGT3-4JRYV-JKF5O'
		this.baidukey = 'fjke3YUipM9N64GdOIh1DNeK2APO2WcT'
  }

  async guessPosition (req) {
    return new Promise(async (resolve, reject) => {
      let ip
      const defaultIp = '180.158.102.141'
      if (process.env.npm_lifecycle_event === 'dev') {
        ip = defaultIp
      } else {
        try {
          ip = req.headers['x-forwarded-for'] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.connection.socket.remoteAddress
          const ipArr = ip.split(':')
          ip = ipArr[ipArr.length -1] || defaultIp
        } catch (e) {
          ip = defaultIp
        }
      }
      try {
        let result = await this.httpRequset('http://apis.map.qq.com/ws/location/v1/ip', {
          ip,
          key: this.tencentkey
        })

        if (result.status !== 0) {
          result = await this.httpRequset('http://apis.map.qq.com/ws/location/v1/ip', {
            ip,
            key: this.tencentkey2
          })
        }

        if (result.status !== 0) {
          result = await this.httpRequset('http://apis.map.qq.com/ws/location/v1/ip', {
            ip,
            key: this.tencentkey3
          })
        }

        if (result.status !== 0) {
          result = await this.httpRequset('http://apis.map.qq.com/ws/location/v1/ip', {
            ip,
            key: this.tencentkey4
          })
        }
      
        if (result.status === 0) {
          const cityInfo = {
            lat: result.result.location.lat,
            lng: result.result.location.lng,
            city: result.result.ad_info.city,
          }
          cityInfo.city = cityInfo.city.replace(/市$/, '')
          resolve(cityInfo)
        } else {
          console.log(result)
		 		  reject('定位失败')
        }
      } catch (e) {
        reject(err)
      }
    })
  }
}

export default AddressComponent