import mongoose from 'mongoose'
import cityData from '../../initData/cities'

const citySchema = new mongoose.Schema({
  data: {}
})

citySchema.statics.cityGuess = function(name) {
  return new Promise(async (resolve, reject) => {
    const firstWord = name.substr(0, 1).toUpperCase()
    try {
      const city = await this.findOne()
      Object.entries(city.data).map(item => {
        if (item[0] === firstWord) {
          item[1].map(cityItem => {
            if (cityItem.pinyin === name) {
              resolve(cityItem)
            }
          })
        }
      })
    } catch (err) {
      reject({
        name: 'ERROR_DATA',
        message: '查找数据失败'
      })
    }
  })
}

citySchema.statics.cityHot = function () {
  return new Promise(async (resolve, reject) => {
    try {
      const city = await this.findOne()
      console.log(city)
      resolve(city.data.hotCities)
    } catch (err) {
      reject({
        name: 'ERROR_DATA',
				message: '查找数据失败',
      })
      console.log(err)
    }
  })
}

const Cities = mongoose.model('Cities', citySchema)

Cities.findOne((err, data) => {
  if (!data) {
    Cities.create({data: cityData})
  }
})

export default Cities