const mjml2html = require('mjml');
const path = require('path');
const { writeFileSync } = require('fs');

const mjml = `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Helvetica Neue', Arial, sans-serif,'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'" />
      <mj-body background-color="#ffffff"/>
      <mj-text font-size="14px" font-weight="400" line-height="24px" padding="0 0 24px 0" />
      <mj-class name="small-print" align="center" color="#A5A6A9" font-size="11px" line-height="16px"/>
      <mj-button align="left" background-color="transparent" border="3px solid #202124" border-radius="0" color="#202124" font-size="16px" font-weight="500" padding="0 0 24px 0" />
    </mj-attributes>
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-image width="100px" src="https://oliva-static-assets.s3.amazonaws.com/Oliva-logo-93x29%402x.jpg"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column background-color="#f7f7f5" padding="32px 24px">
        <mj-text>
          Hi
        </mj-text>
        <mj-text>
          He says he's the property of Obi-Wan Kenobi, a resident of these parts. And it's a private message for him. Quite frankly, sir I don't know what he's talking about.
        </mj-text>
        <mj-button href="https://welcome.oliva.house">
          Book a consult
        </mj-button>
        <mj-text>
          Our last master was Captain Antilles, but with what we've been through, this little R2 unit has become a bit eccentric.
        </mj-text>
        <mj-text>
          Javier<br/>
          Co-founder
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-image width="200px" src="https://oliva-static-assets.s3.amazonaws.com/focusOnYou-159x265%402x.jpg"></mj-image>
        <mj-text align="center" color="#6A6C73">Oliva aims to take the stress and anxiety out of finding yourself the right support</mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text mj-class="small-print">*|LIST:COMPANY|* © *|CURRENT_YEAR|* All rights reserved.</mj-text>
        <mj-text mj-class="small-print">
          <a href="*|UNSUB|*">Unsubscribe</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

const getHtmlEmail = () =>{

  const { html, errors } = mjml2html(mjml, { validationLevel: 'strict', minify: true });

  if (errors.length) {
    console.error(`Error: `);
    errors.map(console.error);
    return;
  }

  const htmlFileName = `mailchimp.html`;
  const filePath = path.resolve('.', 'templates', htmlFileName);
  writeFileSync(filePath, html);
  console.log(`Success: created '${htmlFileName}'`);
}

getHtmlEmail();
