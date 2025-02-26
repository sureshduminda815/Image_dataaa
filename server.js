const express = require('express')

const path = require('path');

const axios = require('axios')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// middleware

app.use(express.json())
app.use(bodyParser.json());
app.use(cors())




// app.use(bodyParser.urlencoded({
//     extended: false
// }));







const router = require('./routes/productRouter.js')


const { products } = require('./models/index.js')
app.use("/api/vacancies",router);
app.use('/admin', router);
app.use('/api', router);
app.use('/images', express.static(path.join(__dirname, './Images')));



app.use(express.urlencoded({ extended: true }))


//sendTextMessage()
//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})