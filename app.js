class CredibankClientConfig {
    constructor(host, port) {
        this.host = host;
        this.port = port;
    }
}

var config;

fetch("appsettings.json")
    .then(results => results.json()
        .then(data => {
            const host = data.CredibankClientConfig.Host
            const port = data.CredibankClientConfig.Port
            config = new CredibankClientConfig(host, port)
        })
    )

async function getDigitalCheck() {
    const accountID = document.getElementById("accountID").value
    const amount = document.getElementById("amount").value
    try{
        const response = await axios.get(`${config.host}:${config.port}/check/${accountID}/amount/${amount}`)
        console.log(response.data)
        const datetime = new Date(response.data.date)
        const date = datetime.toLocaleDateString()
        const time = datetime.toTimeString()
        $("#resultStatus").text("Successful transaction!")
        $("#resultAccount").text("Account ID: " + accountID)
        $("#resultAmount").text("Amount: " + amount + "€")
        $("#resultDate").text("Date: " + date)
        $("#resultTime").text("Time: " + time)
        $("#resultCheckID").text("Check ID: " + response.data.checkID)
        $("#resultStatus").show()
        $("#resultAccount").show()
        $("#resultAmount").show()
        $("#resultDate").show()
        $("#resultTime").show()
        $("#resultCheckID").show()
    } catch (error) {
        if (accountID != "" && amount <= 0) {
            $("#resultStatus").text("Transaction failed! No amount specified.")
        }
        else {
            $("#resultStatus").text("Transaction failed! Verify account ID number.")
        }
        $("#resultStatus").show()
        console.log(error)
    }
}

function validCurrency(id, value) {
    document.getElementById(id).value = parseFloat(value).toFixed(2);
}

$(document).ready(function(){
    document.getElementById('resultModal').addEventListener('hidden.bs.modal', function (event) {
        $("#resultStatus").hide()
        $("#resultAccount").hide()
        $("#resultAmount").hide()
        $("#resultDate").hide()
        $("#resultTime").hide()
        $("#resultCheckID").hide()
    })
})
