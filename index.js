const express = require('express')
const app = express()
const mongoose = require('mongoose')
const restaurants=require('./routers/restaurants')

const connectionString='mongodb://127.0.0.1:27017/restaurants'
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to the database');

    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });



app.listen(3000, () => {
    console.log('Server Listening on port 3000...')
})
app.use(express.json())

app.use('/restaurants',restaurants)


app.get('*',(req,res)=>{
    res.send('Page Not Found')
})