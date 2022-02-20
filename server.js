const express = require('express')
const cors = require('cors')

const hostname = '127.0.0.1'
const port = process.env.PORT || 80

const app = express()

app.use(express.static('./'));

// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
// }
app.use(cors())

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
