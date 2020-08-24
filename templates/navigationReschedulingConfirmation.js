const mjml2html = require('mjml');
const path = require('path');
const { writeFileSync } = require('fs');

const mjml = `<mjml>
  <mj-head>
    <mj-style>
      .body-left > div { Margin: 0px 20px !important; } .gmail-show { display: none !important; } u ~ div .gmail-hide { display: none !important; } u ~ div .gmail-show { display: table-cell !important; }
    </mj-style>
    <mj-attributes>

      <mj-all font-family="-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Helvetica Neue', Arial, sans-serif,'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'" />
      <mj-body background-color="#ffffff" />
      <mj-text font-size="14px" font-weight="400" line-height="24px" padding="0 0 24px 0" />
      <mj-button align="left" background-color="transparent" border="3px solid #202124" border-radius="0" color="#202124" font-size="16px" font-weight="500" padding="0 0 24px 0" />
    </mj-attributes>
  </mj-head>
  <mj-body>
    <mj-raw>
      <div class="body-left">
    </mj-raw>

    <mj-section>
      <mj-column>
        <mj-divider border-color="transparent"></mj-divider>
        <mj-text>
          Hi \${memberFirstName}
        </mj-text>
        <mj-text>
          Just letting you know your intro meeting has been rescheduled successfully. I'll see you on <strong>\${prettyDate}</strong>
        </mj-text>
        <mj-button css-class="gmail-show" href="\${googleCalendarLink}">
          Add to Google calendar
        </mj-button>
        <mj-button css-class="gmail-hide" href="\${icsFileDownloadLink}">
          Add to calendar
        </mj-button>
        <mj-text>
          I'll be in touch before your intro meeting with some practical information. If you need anything at all just reply to this email.
        </mj-text>
        <mj-text>
          Take care
        </mj-text>
        <mj-text>
          \${navigatorFirstName}<br/> <span>Care navigator</span>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-image align="left" padding="0px" width="100px" src="https://oliva-static-assets.s3.amazonaws.com/Oliva-logo-93x29%402x.jpg"></mj-image>
        <mj-divider border-color="transparent"></mj-divider>
        <mj-text align="left" color="#6A6C73">Oliva aims to take the stress and anxiety out of finding yourself the right support</mj-text>
      </mj-column>
    </mj-section>
    <mj-raw>
      </div>
    </mj-raw>

  </mj-body>
</mjml>`;

const getHtmlEmail = () =>{

  const { html, errors } = mjml2html(mjml, { validationLevel: 'strict' });

  if (errors.length) {
    console.error(`Error: `);
    errors.map(console.error);
    return;
  }

  const htmlFileName = `navigationReschedulingConfirmation.html`;
  const filePath = path.resolve('.', 'templates', htmlFileName);
  writeFileSync(filePath, html);
  console.log(`Success: created '${htmlFileName}'`);
}

getHtmlEmail();