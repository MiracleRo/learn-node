class CityHandle {
  async test (ctx) {
    ctx.body = {
      'test': 'dd'
    }
  }
}

export default new CityHandle()