import mongoose from 'mongoose'
import chalk from 'chalk'
import config from '../config/config'

mongoose.connect(config.dbUrl, {useNewUrlParser: true})
mongoose.Promise = global.Promise

const db = mongoose.connection

db.once('open' ,() => {
	console.log(
    chalk.green('连接数据库成功')
  )
})

db.on('error', function(error) {
    console.error(
      chalk.red('Error in MongoDb connection: ' + error)
    )
    mongoose.disconnect()
})

db.on('close', function() {
    console.log(
      chalk.red('数据库断开，重新连接数据库')
    )
    mongoose.connect(config.dbUrl, {server:{auto_reconnect:true}})
})

export default db