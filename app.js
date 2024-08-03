
require('dotenv').config();
const express = require('express');
const authRouter = require('./route/auth')
const app = express();
const PORT = process.env.APP_PORT

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World" })
});

// router starts

app.use('/api/v1/auth', authRouter);

// default

app.use("*", (req, res) => {
    res.status(404).json({ message: "Not Found" })
})


app.listen(PORT | 3001, () => {
    console.log('Server is running', PORT)
})