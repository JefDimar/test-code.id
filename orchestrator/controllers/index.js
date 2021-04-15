const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis({ connectTimeout: 60000 }) 

class Controller {
  static async findAll(req, res, next) {}
  static async findAcc(req, res, next) {}
  static async findId(req, res, next) {}
  static async create(req, res, next) {}
  static async remove(req, res, next) {}
  static async update(req, res, next) {}
}

module.exports = Controller