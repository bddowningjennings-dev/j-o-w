const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.listen(8000, () => console.log('listening...'))
