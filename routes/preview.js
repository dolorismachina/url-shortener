const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/:url', async (req, res) => {
  try {
    res.render('preview', {})
  }
  catch (err) {
    res.send(`${err}`)
    console.error(err)
  }
})


module.exports = router
