const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./config/database')

const app = express()
const Routes = require('./routes/routes')

const PORT = process.env.PORT || 4000

app.set('port', PORT)

app.use(cors())
app.use(express.json())
app.use('/api', Routes)

app.listen(PORT, () => {
    console.log('Server running on port:' + app.get('port'))
})