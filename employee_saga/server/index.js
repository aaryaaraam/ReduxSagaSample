const express = require('express')
const data = require("./data");
const app = express()
const port = 4000

app.get('/', (req, res) => {
    res.json({ test: "express running - test success" })
})
app.get('/data', (req, res) => {
    res.setHeader("content-type", "application/json")
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(data)
})

app.listen(port, () => {
    console.log(`app running in ${port}`)
})