const express = require('express');
// const mongoose = require('mongoose')
// const cors = require('cors')
// const serverResponse = require('./utils/serverResponse')
// const { productAllowedUpdates } = require('./constants/allowedUpdates')

const app = express();

require("dotenv").config()

app.use(express.json());
// app.use(express.static("client/build"))
// app.use(cors())


//MODEL



//ROUTES

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get("*", (req, res) => {
//   res.sendFile(__dirname + "/client/build/index.html")
// })

// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });


app.listen(8000, () => {
    console.log('Server running at http://127.0.0.1:8000/');
})