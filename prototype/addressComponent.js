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

  async searchPlace (keyword, cityName, type = 'search') {
    try {
      const resObj = await this.httpRequset('http://apis.map.qq.com/ws/place/v1/search', {
        key: this.tencentkey,
        keyword: encodeURIComponent(keyword),
        boundary: `region(${encodeURIComponent(cityName)},0)`,
        page_size: 10
      })
      if (resObj.status === 0) {
        return resObj
      } else {
        throw new Error('搜索位置信息失败')
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async getpois(lat, lng) {
    try {
      
      const params = {
        location: `${lat},${lng}`,
        key: this.tencentkey
      }
      let res = await this.httpRequset('https://apis.map.qq.com/ws/geocoder/v1/', params)
      if (res.status !== 0) {
        params.key = this.tencentkey2;
	 			res = await this.fetch('http://apis.map.qq.com/ws/geocoder/v1/', params)
      }
      if (res.status != 0) {
        params.key = this.tencentkey3;
        res = await this.fetch('http://apis.map.qq.com/ws/geocoder/v1/', params);
      }
      if (res.status != 0) {
        params.key = this.tencentkey4;
        res = await this.fetch('http://apis.map.qq.com/ws/geocoder/v1/', params);
      }
     if (res.status == 0) {
       return res
     } else {
       throw new Error('通过获geohash取具体位置失败');
     }
    } catch (err) {
      console.log('定位失败' +err)
      throw new Error(err)
    }
  }
}

export default AddressComponent