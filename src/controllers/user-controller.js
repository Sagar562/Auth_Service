const UserService = require('../services/user-service');
const { ServerErrorCodes, SuccessCodes } = require('../utils/error-codes');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const user = await userService.createUser({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(SuccessCodes.CREATED).json({
            data: user,
            success: true,
            message: 'Successfully created a new user',
            error: {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            error: error.explanation
        });
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: 'user is authenticated',
            error: {}
        });
    } catch (error) {
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: error
        });
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: 'Successfully signIn',
            error: {}
        });
    } catch (error) {
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Error while singIn user',
            error: error
        });
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: 'successfully get user as admin',
            error: {}
        })
    } catch (error) {
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Error while checking user as Admin',
            error: error
        });
    }
}

module.exports = {
    create,
    isAuthenticated,
    signIn,
    isAdmin
}