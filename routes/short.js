const db = require('../db')
const express = require('express')
const randomString = require('randomstring')


const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const result = await db.retrieveTarget(req.params.id)
  }
  catch (err) {
    res.send(`${err}`)
    console.error(err)
  }

  res.render('short', {
    method: req.method,
    path: req.originalUrl
  })
})


router.post('/', async (req, res) => {
  try {
    const result = await db.insertTarget(req.body.target)  
    res.render('short', {url: result.rows[0].url, target: result.rows[0].target})
  }
  catch (err) {
    res.send(`${err}`)
    console.error(err)
  }
})

module.exports = router
