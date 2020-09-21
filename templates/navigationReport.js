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
          \${strings.HI} \${memberFirstName}
        </p></mj-text>
        <mj-text><p>
          \${strings.IT_WAS_GREAT_TO_MEET_YOU}
        </p></mj-text>
        <mj-text><p>
					\${strings.GOOD_NEWS_WEVE_FOUND_A_THERAPIST}
        </p></mj-text>
        <mj-text><p>
          \${strings.YOU_CAN_READ_MY_REPORT_ON_WHY} <a href="\${memberReportFileLink}">\${strings.HERE}</a>. \${strings.ITS_ENCRYPTED_SO_ONLY_YOU_AND_I}
        </p></mj-text>
        <mj-text><p>
          \${strings.WHEN_YOURE_READ_YOU_CAN_GO_AHEAD_AND_BOOK}
        </p></mj-text>
        <mj-button href="\${schedulingLink}">
				  \${strings.BOOK_YOUR_FIRST_SESSIONS}
        </mj-button>
        <mj-text><p>
          \${strings.AS_ALWAYS_FEEL_FREE_TO_REPLY}
        </p></mj-text>
        <mj-text><p>
					\${strings.TAKE_CARE}
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

  const { html, errors } = mjml2html(mjml, { validationLevel: 'strict', minify: true });

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
