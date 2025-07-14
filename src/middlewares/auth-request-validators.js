const { ClientErrorCodes } = require("../utils/error-codes")

const validateUserAuth = (req, res) => {
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

module.exports = {
    validateUserAuth
}