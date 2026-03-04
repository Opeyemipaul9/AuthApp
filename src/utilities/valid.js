export const valid = {
  required: label => value =>
    !value || !value.trim() ? `${label} is required.` : '',

  email: () => value =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? 'Enter a valid email address.'
      : '',

  minLength:
    (min, label = 'This field') =>
    value =>
      value && value.length < min
        ? `${label} must be at least ${min} characters.`
        : '',

  maxLength:
    (max, label = 'This field') =>
    value =>
      value && value.length > max
        ? `${label} must be at most ${max} characters.`
        : '',

  passwordStrength: () => value => {
    if (!value) return '';
    if (value.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(value)) return 'Include at least one uppercase letter.';
    if (!/[0-9]/.test(value)) return 'Include at least one number.';
    return '';
  },
  confirmPassword:
    (passwordField = 'password') =>
    (value, allValues) =>
      value !== allValues[passwordField] ? 'Passwords do not match.' : '',

  compose:
    (...rules) =>
    (value, allValues) => {
      for (const rule of rules) {
        const error = rule(value, allValues);
        if (error) return error;
      }
      return '';
    },
};
