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
        const { data } = await axios.get(service)
        console.log(data)

        redis.set('userData:data', JSON.stringify(data))
        res.status(200).json(data)
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
      if (data._id) {
        res.status(200).json(JSON.parse(data))
      } else {
        const { data } = await axios.get(`${service}accountNumber/${id}`)
        console.log(data)

        redis.set('userDataByAcc:data', JSON.stringify(data))
        res.status(200).json(data)
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

      if (data._id) {
        res.status(200).json(JSON.parse(data))
      } else {
        const { data } = await axios.get(`${service}idNumber/${id}`)
        console.log(data)

        redis.set('userDataByID:data', JSON.stringify(data))
        res.status(200).json(data)
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }

  static async create(req, res, next) {
    await redis.del('userData:data')
    const input = {
      userName: req.body.userName,
      accountNumber: req.body.accountNumber,
      emailAddress: req.body.emailAddress,
      identityNumber: req.body.identityNumber,
    }
    try {
      const { data } = await axios.post(service, input)
      console.log(data)

      res.status(201).json(data.ops[0])
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }

  static async remove(req, res, next) {
    await redis.del('userData:data')
    const id = req.params.idUser

    try {
      const { data } = await axios.delete(`${service}${id}`)
      console.log(data)

      res.status(200).json(data.result)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }

  static async update(req, res, next) {
    await redis.del('userData:data')
    const id = req.params.idUser
    const input = {
      userName: req.body.userName,
      accountNumber: req.body.accountNumber,
      emailAddress: req.body.emailAddress,
      identityNumber: req.body.identityNumber,
    }

    try {
      const { data } = await axios.patch(`${service}${id}`, input)
      console.log(data)

      res.status(200).json(data)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }
}

module.exports = Controller