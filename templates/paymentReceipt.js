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
      <mj-table padding="0" font-size="14px" width="400px" />
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
            \${strings.THANKS_FOR_YOUR_PAYMENT_JUST_NOW}
          </p>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding-top="0">
      <mj-column>
        <mj-table>
          <tr style="text-align: left; border-bottom: 3px solid">
            <th style="padding-bottom: 4px; width: 80%">\${strings.PACK}</th>
            <th style="padding-bottom: 4px; width: 20%">\${strings.PAID}</th>
          </tr>
          <tr>
            <td style="padding: 16px 0 4px">\${packName}</td>
            <td style="padding: 16px 0 4px">\${price}</td>
          </tr>
          \${appointmentTypes.map(({ id, name }) => \`
          <tr>
            <td>\${remainingCounts[id]} x \${name}</td>
          </tr>
          \`).join('')}
        </mj-table>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text>
          <p>
            \${strings.YOU_HAVE} \${expiry} \${strings.TO_USE_YOUR_SESSIONS}
          </p>
        </mj-text>
        <mj-text>
          <p>
            \${strings.IF_YOU_HAVE_ANY_QUESTIONS}
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

  const htmlFileName = `paymentReceipt.html`;
  const filePath = path.resolve('.', 'templates', htmlFileName);
  writeFileSync(filePath, html);
  console.log(`Success: created '${htmlFileName}'`);
}

getHtmlEmail();
