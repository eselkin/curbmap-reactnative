module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint', // needed for decorators and class properties
  rules: {
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'never'],
    // Avoid code that looks like two expressions but is actually one
    // Allows omission of semicolons
    'no-unexpected-multiline': 2,
  },
}
