import Cities from '../../models/v1/cities'
import pinyin from 'pinyin'
import AddressComponent from '../../prototype/addressComponent'


class CityHandle extends AddressComponent {
  constructor () {
    super()
    this.getCity = this.getCity.bind(this)
  }
  async getCity(ctx, next) {
    const type = ctx.query.type
    let cityInfo

    try {
      switch (type) {
        case 'guess':
        const city = await this.getCityName(ctx.req)
        cityInfo = await Cities.cityGuess(city)
        break;
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
}

export default new CityHandle()