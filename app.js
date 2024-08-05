
require('dotenv').config();
const express = require('express');
const authRouter = require('./route/auth')
const projectRouter = require('./route/projectRoute');
const userRouter = require('./route/userRoute');
const AppError = require('./utils/appError')
const catchAsync = require('./utils/catchAsync')
const globalErrorHandler = require('./controller/errorController')

const app = express();
const PORT = process.env.APP_PORT


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.get('/', async (req, res) => {
    res.status(200).json({ message: "Home Page" })
});

// routers

app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

// Not found URLs

app.use(
    '*',
    catchAsync(async (req, res, next) => {
        throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    })
);

// Gloabl error handling

app.use(globalErrorHandler);


app.listen(PORT | 3001, () => {
    console.log('Server is running', PORT)
})