require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mustache = require('mustache-express')


const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))
app.engine('html', mustache(__dirname + '/views/partials', '.html'));
app.set('view engine', 'html');


const routes = {}
routes.index = require('./routes/index')
routes.short = require('./routes/short')
routes.preview = require('./routes/preview')
app.use('/', routes.index)
app.use('/short', routes.short)
app.use('/preview', routes.preview)


app.listen(process.env.PORT || 3000, () => console.log('Listening...'))
