const router = require('express').Router()
const Controller = require('../controllers/index')

router.get('/userData', Controller.findAll)
router.get('/userData/:accNumber', Controller.findAcc)
router.get('/userData/:idNumber', Controller.findId)

router.post('/userData', Controller.create)
router.delete('/userData/:idUser', Controller.remove)
router.patch('/userData/:idUser', Controller.update)

module.exports = router