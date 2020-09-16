const mjml2html = require('mjml');
const path = require('path');
const { writeFileSync } = require('fs');

const mjml = `<mjml>
  <mj-head>
    <mj-style>
      .body-left > div { Margin: 0px 20px !important; } .gmail-show { display: none !important; } u ~ div .gmail-hide { display: none !important; } u ~ div .gmail-show { display: table-cell !important; } p { margin: 0; }
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
          <p>
            \${strings.HI} \${memberFirstName}
          </p>
        </mj-text>
        <mj-text>
          <p>
            \${strings.IM} \${navigatorFirstName}, \${strings.AND_ILL_BE_HELPING_YOU} <strong>\${prettyDate}</strong>
          </p>
        </mj-text>
        <mj-button css-class="gmail-show" href="\${googleCalendarLink}">
          \${strings.ADD_TO_CALENDAR}
        </mj-button>
        <mj-button css-class="gmail-hide" href="\${icsFileDownloadLink}">
          \${strings.ADD_TO_CALENDAR}
        </mj-button>
        <mj-text>
          <p>
            \${strings.IF_YOU_HAVE_ANY_QUESTIONS}
          </p>
        </mj-text>
        <mj-text>
          <p>
            \${strings.YOUVE_ALREADY_TAKEN_A_BIG_STEP}
          </p>
        </mj-text>
        <mj-text>
          <p>
            \${strings.REALLY_LOOKING_FORWARD}
          </p>
        </mj-text>
        <mj-text>
          <p>
            \${strings.TAKE_CARE}
          </p>
        </mj-text>
        <mj-text>
          <p>
            \${navigatorFirstName}
          </p>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-image align="left" padding="0px" width="100px" src="https://oliva-static-assets.s3.amazonaws.com/Oliva-logo-93x29%402x.jpg"></mj-image>
        <mj-divider border-color="transparent"></mj-divider>
        <mj-text align="left" color="#6A6C73">
          <p>Focus on you</p>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-raw>
      </div>
    </mj-raw>

  </mj-body>
</mjml>`;

const getHtmlEmail = () =>{

  const { html, errors } = mjml2html(mjml, { validationLevel: 'strict', minify: true });

  if (errors.length) {
    console.error(`Error: `);
    errors.map(console.error);
    return;
  }

  const htmlFileName = `navigationConfirmation.html`;
  const filePath = path.resolve('.', 'templates', htmlFileName);
  writeFileSync(filePath, html);
  console.log(`Success: created '${htmlFileName}'`);
}

getHtmlEmail();
