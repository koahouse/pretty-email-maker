const mjml2html = require('mjml');
const path = require('path');
const { writeFileSync } = require('fs');

const mjml = `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Helvetica Neue', Arial, sans-serif,'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'" />
      <mj-body background-color="#ffffff" />
      <mj-text font-size="14px" font-weight="400" line-height="24px" padding="0 0 24px 0" />
      <mj-button align="left" background-color="transparent" border="3px solid #202124" border-radius="0" color="#202124" font-size="16px" font-weight="500" padding="0 0 24px 0" />
    </mj-attributes>
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-divider border-color="transparent"></mj-divider>
        <mj-text>
          <p>
            Thanks for your payment. Here is a receipt for your records.
          </p>
          <p>
            <strong>Plan</strong><br/> %product%
            <br/>
            <strong>Price</strong><br/> £%total% / month <br/>
            <strong>Paid</strong><br/> £%total%
          </p>
        </mj-text>
        <mj-button css-class="gmail-show" href="%schedulehref%">
          Schedule a session
        </mj-button>
        <mj-text>
          <p>
            If you need help related to plans and payment, you can email <a href="mailto:support@oliva.house">support@oliva.house</a> at any time.
          </p>
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

  const htmlFileName = `paymentReceipt-en.html`;
  const filePath = path.resolve('.', 'templates', htmlFileName);
  writeFileSync(filePath, html);
  console.log(`Success: created '${htmlFileName}'`);
}

getHtmlEmail();
