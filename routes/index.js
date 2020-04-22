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
  try {
    const query = {
      text: 'SELECT target from links WHERE url = $1',
      values: [req.params.url]
    }
    const result = await db.query(query)  
    if (result.rows.length === 0) {
      res.send('Could not find url')
      return
    }

    res.redirect(result.rows[0].target)
  } 
  catch (err) {
    
  }
})


router.post('/', (req, res) => {
  res.send('POST: /')
})

module.exports = router
