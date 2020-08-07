import React, { useRef, useEffect, useState } from 'react';
import './App.css';

import { welcomeEmailHtml } from './welcome-email';

function App() {
  const htmlContainer = useRef(null);
  const [memberName, setMemberName] = useState('');
  const [navigatorName, setNavigatorName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    htmlContainer.current.innerHTML = welcomeEmailHtml;
  }, [])

  useEffect(() => {
    htmlContainer.current.innerHTML = welcomeEmailHtml
      .replace(/{{navigatorName}}/g, navigatorName || '{{navigatorName}}' )
      .replace(/{{memberName}}/g, memberName || '{{memberName}}');
  }, [memberName, navigatorName])

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

  const handleChangeMemberName = ({ target: { value }}) => {
    setIsSuccess(false);
    setMemberName(value)
  };

  const handleChangeNavigatorName = ({ target: { value }}) => {
    setIsSuccess(false);
    setNavigatorName(value)
  };

  return (
    <div className="container">
      <div className="inputs-container">
        <label>New member name</label>
        <input onChange={handleChangeMemberName} type="text" value={memberName}/>
        <label>Your name</label>
        <input onChange={handleChangeNavigatorName} type="text" value={navigatorName}/>
        <button disabled={!memberName || !navigatorName} onClick={handleClickCopy}>Copy email content</button>
        {isSuccess && <div className="success-container">Nice work. Now go back to your GMail and paste into a new email</div>}
      </div>
      <div className="html-container" ref={htmlContainer}>
      </div>
    </div>
  );
}



export default App;
