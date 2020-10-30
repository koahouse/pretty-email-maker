const mjml2html = require('mjml');
const path = require('path');
const { writeFileSync } = require('fs');

const mjml = `<mjml>
  <mj-head>
    <mj-style>
      .body-left > div { text-align: left; Margin: 0px 20px !important; } .gmail-show { display: none !important; } u ~ div .gmail-hide { display: none !important; } u ~ div .gmail-show { display: table-cell !important; } p { margin: 0; }
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
            \${strings.HI} \${therapistFirstName}
          </p>
        </mj-text>
        <mj-text>
          <p>
            \${strings.I_HOPE_YOU_ARE_WELL}.
          </p>
        </mj-text>
        <mj-text>
          <p>
						\${strings.I_HAVE_ASSIGNED_YOU_TO} \${memberFullName} \${strings.BECAUSE_I_BELIEVE_YOUR_EXPERIENCE}.
          </p>
        </mj-text>
        <mj-text>
          <p>
            \${strings.YOURE_ALL_SET_FOR_YOUR_FIRST} \${memberFirstName} \${strings.ON} <strong>\${date}</strong>.
          </p>
        </mj-text>
        <mj-text>
          <p>
						\${strings.WHEN_ITS_TIME} <a href="\${videoCallLink}">\${strings.THIS_LINK}</a> \${strings.TO_JOIN_THE_CALL}.
          </p>
        </mj-text>
        <mj-text>
          <p>
            \${strings.I_AM_ATTACHING_A_REPORT_TO_HELP}.
          </p>
        </mj-text>
        <mj-text>
          <p>
            \${strings.IF_YOU_HAVE_ANY_QUESTIONS}
          </p>
        </mj-text>
        <mj-text>
          <p>
						\${strings.TAKE_CARE}
          </p>
        </mj-text>
        <mj-text>
          <p>
            Ginnette
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

  const htmlFileName = `matchConfirmationForTherapist.html`;
  const filePath = path.resolve('.', 'templates', htmlFileName);
  writeFileSync(filePath, html);
  console.log(`Success: created '${htmlFileName}'`);
}

getHtmlEmail();
