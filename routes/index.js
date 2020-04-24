const db = require('../db')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {
    method: req.method,
    path: req.originalUrl
  })
})


router.get('/:url', async (req, res) => {
  console.log(req.params)
  try {
    const result = await db.retrieveTarget(req.params.url)

    res.redirect(result)
  } 
  catch (err) {
    res.send(`${err}`)
    console.error(`${err}`)
  }
})


router.post('/', (req, res) => {
  res.send('POST: /')
})

module.exports = router
