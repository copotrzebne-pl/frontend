const express = require('express')
const app = express()

require('./server')(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
