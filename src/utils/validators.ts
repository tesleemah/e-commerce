export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailRules = {
    required: "Email address is required",
    pattern: {
        value: EMAIL_REGEX,
        message: "Please enter a valid email address"
    }
};

export const passwordRules = {
    required: "Password is required",
    minLength: {
        value: 8,
        message: "Password must be at least 8 characters"
    }
};

export const nameRules = {
    required: "Name is required",
    minLength: {
        value: 2,
        message: "Name must be at least 2 characters"
    }
}