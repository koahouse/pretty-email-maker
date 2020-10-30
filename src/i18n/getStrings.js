const { en } = require('./en');
const { es } = require('./es');

const getStrings = languageCode => (languageCode === 'es' ? es : en);

module.exports = { getStrings };
