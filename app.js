
async function getDigitalCheck() {
    const accountID = document.getElementById("accountID").value
    const amount = document.getElementById("amount").value
    try {
        const response = await fetch("/getdigitalcheck", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ accountID: accountID, amount: amount })
        });
        response.text().then(function (text) {
            const data = JSON.parse(text);
            console.log(data)
            if (data.status == "OK") {
                const datetime = new Date(data.date)
                const date = datetime.toLocaleDateString()
                const time = datetime.toTimeString()
                $("#resultStatus").text(data.message)
                $("#resultAccount").text("Account ID: " + accountID)
                $("#resultAmount").text("Amount: " + amount + "€")
                $("#resultDate").text("Date: " + date)
                $("#resultTime").text("Time: " + time)
                $("#resultCheckID").text("Check ID: " + data.checkID)
                $("#resultStatus").show()
                $("#resultAccount").show()
                $("#resultAmount").show()
                $("#resultDate").show()
                $("#resultTime").show()
                $("#resultCheckID").show()
            } else {
                $("#resultStatus").text(data.message)
                $("#resultStatus").show()
            }
        });
    } catch (error) {
        $("#resultStatus").text("Transaction failed!")
        $("#resultStatus").show()
        console.log(error)
    }
}

function validCurrency(id, value) {
    if (value > 0) {
        document.getElementById(id).value = parseFloat(value).toFixed(2);
    }
}

$(document).ready(function () {
    document.getElementById('resultModal').addEventListener('hidden.bs.modal', function (event) {
        $("#resultStatus").hide()
        $("#resultAccount").hide()
        $("#resultAmount").hide()
        $("#resultDate").hide()
        $("#resultTime").hide()
        $("#resultCheckID").hide()
    })
})
