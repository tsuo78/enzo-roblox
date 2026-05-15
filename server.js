const express = require("express")
const app = express()

app.use(express.json())

let lastMessage = ""

app.post("/send", (req, res) => {

    lastMessage = req.body.message

    res.json({
        success: true
    })

})

app.get("/message", (req, res) => {

    res.json({
        message: lastMessage
    })

})

app.listen(3000, () => {
    console.log("API ONLINE")
})
