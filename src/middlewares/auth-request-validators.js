const { ClientErrorCodes } = require("../utils/error-codes")

const validateUserAuth = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(ClientErrorCodes.BAD_REQUEST).json({
            data: {},
            success: false,
            message: 'Something went wrong in validating request',
            error: 'email or password is missing in validating request'
        });
    }
    next();
}

const validateisAdmin = (req, res, next) => {
    if (!req.body.id) {
        return res.status(ClientErrorCodes.BAD_REQUEST).json({
            data: {},
            success: false,
            message: 'Something went wrong in validating admin request',
            error: 'userId is missing'
        });
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateisAdmin
}