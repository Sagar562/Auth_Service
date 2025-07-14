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
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Error while creating user in controller',
            error: error
        });
    }
}

const get = async (req, res) => {
    try {
        const user = await userService.getById(req.params.userId);
        return res.status(SuccessCodes.OK).json({
            data: user,
            success: true,
            message: 'User details fetched successfully',
            error: {}
        });
    } catch (error) {
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'Error while getting user by userId in controller',
            error: error
        });
    }
}

module.exports = {
    create,
    get
}