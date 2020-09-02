const mjml2html = require('mjml');
const path = require('path');
const { writeFileSync } = require('fs');

const mjml = `<mjml>
  <mj-head>
    <mj-style>
      .body-left > div { Margin: 0px 20px !important; } p { margin: 0; }
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
        <mj-text><p>
          Hi \${memberFirstName}
        </p></mj-text>
        <mj-text><p>
          It was great to meet you the other day.
        </p></mj-text>
        <mj-text><p>
					Good news — we’ve found a therapist we think will fit your needs.
        </p></mj-text>
        <mj-text><p>
          You can read my <a href="\${memberReportFileLink}">report on why I’ve made this recommendation here</a>. It’s encrypted, so only you and I can access it.
        </p></mj-text>
        <mj-text><p>
          When you’re ready, you can go ahead and book your first sessions.
        </p></mj-text>
        <mj-button href="\${schedulingLink}">
				  Book your first sessions
        </mj-button>
        <mj-text><p>
          As always, feel free to reply to this email if you have a question or concern.
        </p></mj-text>
        <mj-text><p>
					Take care,
        </p></mj-text>
        <mj-text><p>
          \${navigatorFirstName}
        </p></mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-image align="left" padding="0px" width="100px" src="https://oliva-static-assets.s3.amazonaws.com/Oliva-logo-93x29%402x.jpg"></mj-image>
        <mj-divider border-color="transparent"></mj-divider>
        <mj-text align="left" color="#6A6C73"><p>Focus on you</p></mj-text>
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

  const htmlFileName = `navigationReport.html`;
  const filePath = path.resolve('.', 'templates', htmlFileName);
  writeFileSync(filePath, html);
  console.log(`Success: created '${htmlFileName}'`);
}

getHtmlEmail();
