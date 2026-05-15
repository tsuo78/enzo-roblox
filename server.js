const express = require("express")

const app = express()

app.use(express.json())

let lastMessage = ""

async function translate(text) {

    try {

        const response = await fetch(
            "https://translate.argosopentech.com/translate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    q: text,
                    source: "pt",
                    target: "en",
                    format: "text"
                })
            }
        )

        const data = await response.json()

        return data.translatedText

    } catch (err) {

        console.log(err)

        return text
    }
}

app.post("/send", async (req, res) => {

    const text = req.body.message

    const translated = await translate(text)

    lastMessage = translated

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
