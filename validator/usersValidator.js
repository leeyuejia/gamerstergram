const ajv = require('ajv')
const Ajv = new ajv({
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
});
const User = require('./schema/users')
const validator = Ajv.compile(User);
const ValidationError = require('../exceptions/ValidationError')

const convertToArray = (input) => {
    let arr = [];
    if(Array.isArray(input)) {
        input.forEach(el => arr.push(el))
    }else {
        arr.push(input);
    }
    return arr;
}

module.exports = {
    validate (data) {
        const isValid = validator(data);
        if(!isValid) {
            console.log(`Validator Errors: ${validator.errors}`);
            throw new ValidationError(validator.errors);
        }
        // Add default values for createdAt and updatedAt and lastLoggedIn and data.userFollowing
        data.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
        data.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
        data.lastLoggedInAt = data.lastLoggedInAt ? new Date(data.lastLoggedInAt) : new Date();
        data.userFollowing = data.userFollowing ? convertToArray(data.userFollowing) : [];
        return isValid;
    }
};