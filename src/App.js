import React, { Fragment, useRef, useEffect, useState } from 'react';

import { getStrings } from './i18n';
import { getMatchConfirmationHtml } from './templateStrings/getMatchConfirmationHtml';
import { getMatchConfirmationForTherapistHtml } from './templateStrings/getMatchConfirmationForTherapistHtml';
import { EMAIL_TYPES, MEMBER_MATCH_CONFIRMATION, THERAPIST_MATCH_CONFIRMATION } from './constants';
import { getPrettyDateTime } from './utils/getPrettyDateTime';
import { getTherapistNames } from './utils/getTherapistNames';

function App() {
  const htmlContainer = useRef(null);
  const [activeEmailType, setActiveEmailType] = useState(null);
  const [appointment, setAppointment] = useState('');
  const [calendarLinks, setCalendarLinks] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [languageCode, setLanguageCode] = useState('en');

  const strings = getStrings(languageCode);

  useEffect(() => {

    if (activeEmailType === MEMBER_MATCH_CONFIRMATION) {

      if (!appointment || !calendarLinks) return;

      const { firstName, location, datetime, timezone } = JSON.parse(appointment);
      const [googleCalendarLink, icsFileDownloadLink] = JSON.parse(calendarLinks);

      const [therapistFirstName, therapistLastName] = getTherapistNames(location);
      const html = getMatchConfirmationHtml(
        strings,
        firstName,
        [therapistFirstName, therapistLastName].join(' '),
        getPrettyDateTime(datetime, timezone, languageCode),
        googleCalendarLink,
        icsFileDownloadLink,
        location,
        therapistFirstName
      );
      htmlContainer.current.innerHTML = html;
      setIsValid(true);
      return;
    }

    if (activeEmailType === THERAPIST_MATCH_CONFIRMATION) {

      if (!appointment) return;

      const { firstName, lastName, location, datetime, calendarTimezone } = JSON.parse(appointment);

      const [therapistFirstName] = getTherapistNames(location);
      const html = getMatchConfirmationForTherapistHtml(
        strings,
        firstName,
        `${firstName} ${lastName[0]}`,
        therapistFirstName,
        getPrettyDateTime(datetime, calendarTimezone, languageCode),
        location,
      );
      htmlContainer.current.innerHTML = html;
      setIsValid(true);
      return;
    }

  }, [activeEmailType, appointment, calendarLinks, languageCode, strings])

  useEffect(() => {
    setAppointment('');
    setCalendarLinks('');
    setIsValid(false);
    setIsSuccess(false);
    htmlContainer.current && (htmlContainer.current.innerHTML = '');
  }, [activeEmailType])

  const handleClickCopy = () => {
    if (!window || !window.getSelection) return;

    const range = window.document.createRange();
    range.selectNode(htmlContainer.current);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');

    setIsSuccess(true);
  };

  const handleChangeLanguageCode = ({ target: { value }}) => {
    setIsSuccess(false);
    setLanguageCode(value);
  };

  const handleChangeAppointment = ({ target: { value }}) => {
    setIsSuccess(false);
    setAppointment(value)
  };

  const handleChangeCalendarLinks = ({ target: { value }}) => {
    setIsSuccess(false);
    setCalendarLinks(value)
  };

  const isSelectionPending = activeEmailType === null;


  return (
    <div className="container">
      <div className="email-type-container">
        {EMAIL_TYPES.map(emailType => (
          <div className={emailType === activeEmailType ? 'active' : ''} key={emailType} onClick={() => setActiveEmailType(emailType)}>{emailType}</div>
        ))}
      </div>
      <div className="inputs-container">
        {isSelectionPending ? '👈 Select an email type, chele' : (
          <Fragment>
            <input checked={languageCode === 'en'} type="radio" id="en" name="languageCode" onChange={handleChangeLanguageCode} value="en" />
            <label for="en">English</label>
            <input checked={languageCode === 'es'} type="radio" id="en" name="languageCode" onChange={handleChangeLanguageCode} value="es" />
            <label for="es">Castellano</label>
            <label>Get the appointment data from Marc and paste it in here</label>
            <textarea onChange={handleChangeAppointment} type="text" value={appointment}/>
            {[MEMBER_MATCH_CONFIRMATION].includes(activeEmailType) && (
              <Fragment>
                <label>Get the calendar links from Marc and paste them in here</label>
                <textarea onChange={handleChangeCalendarLinks} type="text" value={calendarLinks}/>
              </Fragment>
            )}
            <button disabled={!isValid} onClick={handleClickCopy}>Copy email content</button>
            {isSuccess && <div className="success-container">Nice work. Now go back to your GMail and paste into a new email</div>}
          </Fragment>
        )}
      </div>
      <div className={["html-container", isSelectionPending ? 'pending' : ''].join(' ')} ref={htmlContainer}>
      </div>
    </div>
  );
}



export default App;
