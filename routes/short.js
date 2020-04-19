const db = require('../db')
const express = require('express')
const randomString = require('randomstring')


const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(`SELECT target FROM links WHERE id = ${req.params.id}`)
    res.send(result.rows[0].target)
  }
  catch (err) {
    console.error(err)
    res.send(`${err}`)
  }  
  res.render('short', {
    method: req.method,
    path: req.originalUrl
  })
})


router.post('/', async (req, res) => {
  try {
    const values = {
      target: req.body.target,
      url: randomString.generate({
        length: 8,
        readable: true
      })
    }

    const query = {
      text: `INSERT INTO links(target, url) VALUES($1, $2) RETURNING *`,
      values: [values.target, values.url]
    }
    const result = await db.query(query)
    res.send(result.rows)
    //res.redirect(`/short/${result.rows[0].id}`)
  }
  catch (err) {
    res.send(`${err}`)
    console.error(err)
  }

  
})

module.exports = router
