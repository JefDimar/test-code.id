const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis({ connectTimeout: 60000 })
const service = 'http://localhost:3000/userData/'

class Controller {
  static async findAll(req, res, next) {
    try {
      const data = await redis.get('userData:data')

      if (data) {
        res.status(200).json(JSON.parse(data))
      } else {
        const response = await axios.get(service)
        console.log(response)

        redis.set('userData:data', JSON.stringify(response))
        res.status(200).json(response)
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }

  static async findAcc(req, res, next) {
    try {
      const id = +req.params.accNumber
      const data = await redis.get('userDataByAcc:data')

      if (data) {
        res.status(200).json(JSON.parse(data))
      } else {
        const response = await axios.get(`${service}${id}`)
        console.log(response)

        redis.set('userDataByAcc:data', JSON.stringify(response))
        res.status(200).json(response)
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }

  static async findId(req, res, next) {
    try {
      const id = +req.params.idNumber
      const data = await redis.get('userDataByID:data')

      if (data) {
        res.status(200).json(JSON.parse(data))
      } else {
        const response = await axios.get(`${service}${id}`)
        console.log(response)

        redis.set('userDataByID:data', JSON.stringify(response))
        res.status(200).json(response)
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }

  static async create(req, res, next) { }

  static async remove(req, res, next) { }

  static async update(req, res, next) { }
}

module.exports = Controller