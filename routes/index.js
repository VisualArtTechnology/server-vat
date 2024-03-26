const express = require('express')
const router = express.Router()
const routerClient = require('./routerClient')


router.use('/',routerClient)

module.exports = router