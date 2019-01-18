import Cities from '../../models/v1/cities'
import pinyin from 'pinyin'
import AddressComponent from '../../prototype/addressComponent'


class CityHandle extends AddressComponent {
  constructor () {
    super()
    this.getCity = this.getCity.bind(this)
    this.pois = this.pois.bind(this)
  }
  async getCity(ctx, next) {
    const type = ctx.query.type
    let cityInfo

    try {
      switch (type) {
        case 'guess':
        const city = await this.getCityName(ctx.req)
        cityInfo = await Cities.cityGuess(city)
        break
        case 'hot':
        cityInfo = await Cities.cityHot()
        break
        case 'group':
        cityInfo = await Cities.cityGroup()
        break
        default: 
          cityInfo = {
            name: 'ERROR_QUERY_TYPE',
            message: '参数错误',
          }
        }
        ctx.body = cityInfo
    } catch (e) {
      ctx.body = {
        name: 'ERROR_DATA',
				message: '获取数据失败',
      }
    }
  }

  async getCityById(ctx, next) {
    const cityId = ctx.params.id
    if (isNaN(cityId)) {
      ctx.body = {
        name: 'ERROR_PARAM_TYPE',
				message: '参数错误',
      }
      return
    }
    try {
      const cityInfo = await Cities.getCityById(cityId)
      ctx.body = cityInfo
    } catch (err) {
      ctx.body = {
        name: 'ERROR_DATA',
				message: '获取数据失败',
      }
    }
  }

  async getCityName(req) {
    try {
      const cityInfo = await this.guessPosition(req)
      const pinyinArr = pinyin(cityInfo.city, {
        style: pinyin.STYLE_NORMAL
      })
      let cityName = ''
      pinyinArr.forEach(item => {
        cityName += item[0]
      })
      return cityName
    } catch (err) {
      return '北京'
    }
  }

  async pois(ctx, next) {
    try {
      const geohash = ctx.params.geohash || ''
      if (geohash.indexOf(',') < 0) {
        ctx.body = {
          status: 0,
					type: 'ERROR_PARAMS',
					message: '参数错误',
        }
      }
      const poisArr = geohash.split(',')
      const result = await this.getpois(poisArr[0], poisArr[1])
      ctx.body = {
        address: result.result.address,
				city: result.result.address_component.province,
				geohash,
				latitude: poisArr[0],
				longitude: poisArr[1],
				name: result.result.formatted_addresses.recommend
      }

    } catch (err) {
      console.log('getpois返回信息失败', err)
      ctx.body = {
        status: 0,
				type: 'ERROR_DATA',
				message: '获取数据失败',
      }
    }
  }
}

export default new CityHandle()