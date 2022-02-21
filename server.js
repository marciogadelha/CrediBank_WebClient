const axios = require('axios').default;

class CredibankClientConfig {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }
}

const appsettings = require("./appsettings.json")
const config = new CredibankClientConfig(appsettings.CredibankClientConfig.Host, appsettings.CredibankClientConfig.Port)

async function getDigitalCheck(request, response) {
  console.log(request.body)
  const accountID = request.body.accountID
  const amount = request.body.amount
  try {
    var result = await axios.get(`${config.host}:${config.port}/check/${accountID}/amount/${amount}`)
    result.data["status"] = "OK"
    result.data["message"] = "Successful transaction!"
    console.log(result.data)
    response.send(result.data)
  } catch (error) {
    var resultError = {}
    resultError["status"] = "Failed"
    if (accountID.length != 8) {
      resultError["message"] = "Transaction failed! Verify account ID number."
    }
    else if (amount == '' || amount <= 0) {
      resultError["message"] = "Transaction failed! No amount specified."
    }
    else {
      resultError["message"] = "Transaction failed! " + error.message
    }
    console.log(resultError)
    response.send(resultError)
  }
}

const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 3000

const app = express()

app.use(express.static('./'));

// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
// }
app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/getdigitalcheck', function (req, res) {
  getDigitalCheck(req, res)
})

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
