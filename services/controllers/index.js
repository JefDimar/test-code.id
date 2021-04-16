const UserData = require('../models/userData')

class Controller {
  static async findAll (req, res, next) {
    try {
      const result = await UserData.find()
      console.log(result)
      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }

  static async findAcc (req, res, next) {
    try {
      const id = +req.params.accNumber
      console.log(id, "di index service")
      const result = await UserData.findAccNum(id)
      console.log(result)
      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }

  static async findId (req, res, next) {
    try {
      const id = req.params.idNumber

      const result = await UserData.findIDNum(id)
      console.log(result)
      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }

  static async create (req, res, next) {
    try {
      const input = {
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber
      }

      const result = await UserData.create(input)
      console.log(result)
      res.status(201).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }

  static async remove(req, res, next) {
    try {
      const id = req.params.idUser
      
      const result = await UserData.delete(id)
      console.log(result)
      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }

  static async update (req, res, next) {
    try {
      const id = req.params.idUser
      const input = {
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber
      }

      const result = await UserData.update(id, input)
      console.log(result)
      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }
}

module.exports = Controller