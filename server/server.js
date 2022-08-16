const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.options('*', cors())
const port = 3000;


app.get('/', (req, res) => {
    res.send('BlockyTracky')
}); 



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
  