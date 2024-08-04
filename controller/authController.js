const user = require('../db/models/user');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const generateToken = (payload) => {
    return JWT.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRY_DATE
    })
}

const signup = catchAsync(async (req, res, next) => {
    const { userType, firstName, lastName, email, password, confirmPassword } = req.body;
    if (![1, 2].includes(userType)) {
        throw new AppError('Invalid user Type', 400);
    }

    const newUser = await user.create({
        userType: userType,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    });

    if (!newUser) {
        return next(new AppError('Failed to create the user', 400));
    }

    const jsFormat = newUser.toJSON();
    delete jsFormat.password
    delete jsFormat.deletedAt

    jsFormat.token = generateToken({ id: jsFormat.id, email: jsFormat.email })

    return res.status(200).json({
        status: 'Success',
        message: jsFormat
    })
});


const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new AppError('Invalid user Type', 400);
    }

    const result = await user.findOne({ where: { email } });

    if (!result || !(await bcrypt.compare(password, result.password))) {
        return res.status(401).json({
            'status': 'Faled',
            'message': "Incorrect email and password"
        })
    }

    const token = generateToken({
        id: result.id,
        email: result.email
    })

    return res.status(200).json({
        'status': 'Sucess',
        'token': token
    })

});

const authentication = catchAsync(async (req, res, next) => {
    // 1. get the token from headers
    let idToken = '';
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Bearer asfdasdfhjasdflkkasdf
        idToken = req.headers.authorization.split(' ')[1];
    }
    if (!idToken) {
        return next(new AppError('Please login to get access', 401));
    }
    // 2. token verification
    const tokenDetail = JWT.verify(idToken, process.env.JWT_SECRET_KEY);
    // 3. get the user detail from db and add to req object
    const freshUser = await user.findByPk(tokenDetail.id);

    if (!freshUser) {
        return next(new AppError('User no longer exists', 400));
    }
    req.user = freshUser;
    return next();
});


const restrictTo = (...userType) => {
    const checkPermission = (req, res, next) => {
        if (!userType.includes(req.user.userType)) {
            return next(
                new AppError(
                    "You don't have permission to perform this action",
                    403
                )
            );
        }
        return next();
    };

    return checkPermission;
};

module.exports = {
    signup,
    login,
    restrictTo,
    authentication
}