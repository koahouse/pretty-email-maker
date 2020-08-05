import React, { useRef, useEffect } from 'react';
import './App.css';

import { welcomeEmailHtml } from './welcome-email';

function App() {
  const htmlContainer = useRef(null);

  useEffect(() => {
    htmlContainer.current.innerHTML = welcomeEmailHtml;
  }, [])

  const handleClickCopy = () => {

    if (!window) return;

    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {  // IE?
      document.selection.empty();
    }

    if (!window.getSelection) return;

    const range = window.document.createRange();

    range.selectNode(htmlContainer.current);

    const selection = window.getSelection();

    selection.addRange(range);

    const blob = new Blob([selection], { type: 'text/html'});
    // eslint-disable-next-line no-undef
    const item = new ClipboardItem({
      'text/plain': blob
    })

    navigator.clipboard.write([item])
  };

  return (
    <React.Fragment>
      <div className="inputs-container">
        <button onClick={handleClickCopy}>Copy</button>
      </div>
      <div className="html-container" ref={htmlContainer}>
      </div>
    </React.Fragment>
  );
}



export default App;
