const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Errors = {
    REQUIRED: 'Field is required',
    TOO_SHORT: 'Too short',
    EMAIL_FORMAT: 'Email format is invalid',
};

const requiredValidation = (value) => !value ? Errors.REQUIRED : null;
const emailValidation = (value) => !emailRegex.test(value) ? Errors.EMAIL_FORMAT : null;
const shouldBeEqual = ({value: firstValue, name: firstName}, {value: secondValue, name: secondName}) => {
    if (firstValue !== secondValue) {
        const error = `${firstName} and ${secondName} should be equal.`;
        return {
            [firstName]: error,
            [secondName]: error
        };
    }

    return null;
};
const lengthValidation = (value) => value.length < 7 ? Errors.TOO_SHORT: null;

export {
    lengthValidation,
    shouldBeEqual,
    requiredValidation,
    emailValidation
};