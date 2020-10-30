const moment = require('moment-timezone');

const getPrettyDateTime = (dateTime, timezone, languageCode = 'en') => {
  moment.locale(languageCode);

  return moment
    .parseZone(dateTime)
    .tz(timezone)
    .format(
      languageCode === 'es'
        ? 'dddd, D [de] MMMM [a las] HH:mm z'
        : 'dddd, MMMM D [at] HH:mm z'
    );
};

module.exports = { getPrettyDateTime };
