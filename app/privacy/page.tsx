import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Motz Turf Farms",
  description: "How Motz Turf Farms collects, uses and protects information submitted through motzfarm.com.",
};

export default function PrivacyPolicy() {
  return (
    <main className="privacy-page">
      <header className="privacy-header">
        <a href="/" aria-label="Return to the Motz Turf Farms home page">
          <img src="/motz/motz-avi-logo.png" alt="Motz Turf Farms" />
        </a>
        <a className="privacy-home-link" href="/">Return to website</a>
      </header>

      <article className="privacy-content">
        <p className="privacy-eyebrow">Motz Turf Farms</p>
        <h1>Privacy policy</h1>
        <p className="privacy-updated">Last updated August 23, 2026</p>
        <p className="privacy-intro">
          Motz Turf Farms respects your privacy. This policy explains what information we collect through
          motzfarm.com, why we use it and the choices available to you.
        </p>

        <section>
          <h2>Information you provide</h2>
          <p>
            When you request a quote, we may collect your name, email address, phone number, project address,
            requested service, preferred timing and the project details you choose to provide.
          </p>
        </section>

        <section>
          <h2>Information collected automatically</h2>
          <p>
            We use Google Analytics to understand how visitors find and use the website. This may include
            general device and browser information, approximate location, visited pages and interactions.
            We do not intentionally send your quote-form name, email, phone number, address or message to
            Google Analytics.
          </p>
        </section>

        <section>
          <h2>How we use information</h2>
          <ul>
            <li>Respond to quote requests and communicate about potential or active projects.</li>
            <li>Send a confirmation that a request was received.</li>
            <li>Operate, secure and improve the website and its services.</li>
            <li>Understand website traffic and the effectiveness of our marketing.</li>
          </ul>
        </section>

        <section>
          <h2>Service providers</h2>
          <p>
            We use trusted providers to operate the website, including Cloudflare for hosting and security,
            Resend for form-notification emails and Google Analytics for website measurement. These providers
            process information only as needed to provide their services and under their own privacy terms.
            Motz Turf Farms does not sell personal information collected through this website.
          </p>
        </section>

        <section>
          <h2>Cookies and analytics choices</h2>
          <p>
            Google Analytics may use cookies or similar technologies. You can restrict cookies through your
            browser settings. Google also provides a browser-based
            {" "}<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">Analytics opt-out tool</a>.
          </p>
        </section>

        <section>
          <h2>Retention and security</h2>
          <p>
            Quote information is retained only as long as reasonably needed for customer service, business
            records and legal obligations. Google Analytics event and user data is configured for a 14-month
            retention period. We use reasonable administrative and technical safeguards, but no online system
            can be guaranteed completely secure.
          </p>
        </section>

        <section>
          <h2>Children&apos;s privacy</h2>
          <p>This website is intended for property owners and business customers and is not directed to children under 13.</p>
        </section>

        <section>
          <h2>Changes and contact</h2>
          <p>
            We may update this policy as our website or services change. Questions or requests concerning your
            information can be sent to <a href="mailto:info@motzfarm.com">info@motzfarm.com</a>, or mailed to
            Motz Turf Farms, 6280 Clough Pike, Cincinnati, OH 45244.
          </p>
        </section>
      </article>
    </main>
  );
}
