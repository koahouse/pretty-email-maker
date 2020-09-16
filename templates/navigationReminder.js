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
        <mj-text>
          <p>
            \${strings.HI} \${memberFirstName}
          </p>
        </mj-text>
        <mj-text>
          <p>
            \${strings.JUST_A_QUICK_REMINDER} <strong>\${prettyTime}</strong> \${strings.TOMORROW}
          </p>
        </mj-text>
        <mj-text>
          <p>
            \${strings.ALL_YOU_NEED_TO_DO_IS_FIND} <a href="\${videoCallLink}">\${strings.CLICK_HERE_TO_JOIN}</a>
          </p>
        </mj-text>
        <mj-text>
          <p>
            \${strings.IF_YOU_HAVE_A_QUESTION_YOUD_LIKE_TO_ASK_BEFORE}
          </p>
        </mj-text>
        <mj-text>
          <p>
            \${strings.LOOK_FORWARD_TO_SEEING_YOU}
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

  const htmlFileName = `navigationReminder.html`;
  const filePath = path.resolve('.', 'templates', htmlFileName);
  writeFileSync(filePath, html);
  console.log(`Success: created '${htmlFileName}'`);
}

getHtmlEmail();
