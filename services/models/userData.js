const { ObjectID } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class UserData {
  static find() {
    return getDatabase().collection('userData').find().toArray()
  }

  static create(data) {
    return getDatabase().collection('userData').insertOne(data)
  }

  static findAccNum(accNum) {
    return getDatabase().collection('userData').findOne({ "accountNumber": accNum })
  }

  static findIDNum(IDNum) {
    return getDatabase().collection('userData').findOne({ "identityNumber": IDNum })
  }

  static delete(id) {
    return getDatabase().collection('userData').deleteOne({ _id: ObjectID(id) })
  }

  static update(id, data) {
    return getDatabase().collection('userData').replaceOne({ _id: ObjectID(id) }, data, { upsert: true })
  }
}

module.exports = UserData