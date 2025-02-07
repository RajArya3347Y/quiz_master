const express = require('express')

const router = express.Router()

router.use('/',express.static('./Projects/quiz_master/dist'))

module.exports = router;