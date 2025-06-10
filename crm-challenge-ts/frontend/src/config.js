import * as envSchema from 'env-schema';

const config =  {
  VERSION: {
    type: 'string',
    default: '0.1.0',
  },
  BACKEND_URL: {
    type: 'string',
    default: 'http://0.0.0.0',
  },
  BACKEND_PORT: {
    type: 'number',
    default: 3001
  },
};

export const customerMessages = {
  SUCCESS: 'Customer created successfully!',
  FAILURE: 'Failed to create customer.',
  ERROR: 'Error occurred while submitting.'
};

export const regexPatterns = {
  NAME_PATTERN: "^[\\p{L}' \\-]{2,}$",
  NAME_TITLE: "At least 2 letters; only letters, spaces, apostrophes (') and hyphens (-) allowed",
  EMAIL_PATTERN: "^[A-Za-z0-9._%+\\-]+@[A-Za-z0-9\\-]+(?:\\.[A-Za-z0-9\\-]+)*\\.[A-Za-z]{2,}$",
  EMAIL_TITLE: "Please enter a valid email address (e.g. name@example.com)"
};

export const schema = {
  type: 'object',
  required: Object.keys(config), // all properties are required!
  properties: config,
};

export default envSchema({ schema });
