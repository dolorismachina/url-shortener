const bodyParser = require('body-parser')
const express = require('express')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html')
  res.send('w')
})


app.post('/', (req, res) => {
  console.log(req.body.target)

  res.end()
})


app.get('/:url', (req, res) => {
  res.redirect('https://google.com')
})

app.listen(process.env.PORT)
