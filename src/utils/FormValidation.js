export const existNumber = (string) => {
    const regex = RegExp("[0-9]");
    if (!regex.test(string)) {
        return ("a number");
    }
};

export const existSpecial = (string) => {
    const regex = RegExp("[@]");
    if (!regex.test(string)) {
        return ("@");
    }
};

// ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$

export const existUppercase = (string) => {
    const regex = new RegExp("[A-Z]");
    if (!regex.test(string)) {
        return ("an uppercase");
    }
};

export const validateMaxLength = (string, maxLength) => {
    if (string.length > maxLength) {
        return (`a max of ${maxLength} characters`);
    }
};

export const validateMinLength = (string, minLength) => {
    if (string.length < minLength) {
        return (`a min of ${minLength} characters`);
    }
};

export const checkFormErrors = (value, validators, options) => {
    const errors = [];
    if (!value || !validators) return;
    if (!(validators instanceof Array)) return;
    validators.forEach(validator => {
        if (validator === validateMaxLength && options) {
            const error = validator(value, options.maxLength)
            error && errors.push(error)
        } else if (validator === validateMinLength && options) {
            const error = validator(value, options.minLength)
            error && errors.push(error)
        } else {
            const error = validator(value)
            error && errors.push(error)
        }
    });
    return errors;
}

export const concatErrorString = (errors) => {
    let result = ''
    if (!errors.length) return result;
    errors.forEach((error, index) => {
        if (index < errors.length - 2) {
            result += error + ', ';
        } else if (index < errors.length - 1) {
            result += error + ' and '
        } else {
            result += error
        }
    })

    return "This field may include " + result;
}