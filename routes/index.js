const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {
    method: req.method,
    path: req.originalUrl
  })
})

router.post('/', (req, res) => {
  res.send('POST: /')
})

module.exports = router
