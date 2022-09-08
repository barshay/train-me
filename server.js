const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(8000, () => {
    console.log('Server running at http://127.0.0.1:8000/');
})