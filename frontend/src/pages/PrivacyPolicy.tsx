import PageTransition from '../components/PageTransition';

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <main className="container" style={{ paddingBottom: '100px', paddingTop: '40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: '24px', background: 'linear-gradient(to right, var(--primary), var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '48px', fontSize: '1.1rem' }}>
            Last updated: April 27, 2026
          </p>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--text-primary)' }}>1. Information We Collect</h2>
            <div className="glass-panel" style={{ padding: 'clamp(20px, 4vw, 32px)' }}>
              <p style={{ marginBottom: '16px', fontWeight: 500 }}>At SQLForge, we collect information to provide a better experience for our users:</p>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                <li><strong>Account Information:</strong> Your username and email address when you register.</li>
                <li><strong>Usage Data:</strong> Information on how you interact with our SQL challenges and levels.</li>
                <li><strong>Technical Data:</strong> IP addresses, browser types, and operating system details.</li>
              </ul>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--text-primary)' }}>2. How We Use Your Information</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              We use the collected data for various purposes:
            </p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <li>To provide and maintain our service.</li>
              <li>To notify you about changes to our service.</li>
              <li>To provide customer support.</li>
              <li>To gather analysis to improve our service.</li>
              <li>To monitor the usage of our service.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--text-primary)' }}>3. Data Security</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              The security of your data is important to us. Your SQL execution takes place in isolated sandboxes to ensure the safety of our infrastructure and your data. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--text-primary)' }}>4. Third-Party Services</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              We may employ third-party companies and individuals to facilitate our Service. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--text-primary)' }}>5. Contact Us</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              If you have any questions about this Privacy Policy, please contact us at privacy@sqlforge.com.
            </p>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
