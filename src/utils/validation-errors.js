const { StatusCodes } = require('http-status-codes');
const AppErrors = require('./error-handler');

class ValidationError extends AppErrors {
    constructor(error) {

        let errorName = error.name;
        let explanation = [];

        error.errors.forEach((err) => {
            explanation.push(err.message)
        });

        super(
            errorName,
            'Not able to validate data in request',
            explanation ,
            StatusCodes.BAD_REQUEST
        )
    }
}

module.exports = ValidationError;