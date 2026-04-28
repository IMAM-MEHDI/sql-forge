import PageTransition from '../components/PageTransition';

export default function TermsConditions() {
  return (
    <PageTransition>
      <main className="container" style={{ paddingBottom: '100px', paddingTop: '40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: '24px', background: 'linear-gradient(to right, var(--primary), var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>
            Terms & Conditions
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '48px', fontSize: '1.1rem' }}>
            Last updated: April 27, 2026
          </p>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--text-primary)' }}>1. Acceptance of Terms</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              By accessing and using SQLForge, you accept and agree to be bound by the terms and provision of this agreement. 
              In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--text-primary)' }}>2. Use of License</h2>
            <div className="glass-panel" style={{ padding: 'clamp(20px, 4vw, 32px)' }}>
              <p style={{ marginBottom: '16px', fontWeight: 500 }}>Permission is granted to use the materials on SQLForge's website for personal, non-commercial transitory viewing only.</p>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                <li>Modify or copy the materials;</li>
                <li>Use the materials for any commercial purpose;</li>
                <li>Attempt to decompile or reverse engineer any software;</li>
                <li>Remove any copyright or other proprietary notations;</li>
                <li>Transfer the materials to another person or "mirror" the materials.</li>
              </ul>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--text-primary)' }}>3. User Conduct</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              You agree to use SQLForge only for lawful purposes. You are prohibited from posting or transmitting any unlawful, threatening, libelous, defamatory, obscene, scandalous, inflammatory, pornographic, or profane material or any material that could constitute or encourage conduct that would be considered a criminal offense.
              Attempting to bypass our SQL sandbox security or performing SQL injection attacks against our core infrastructure is strictly prohibited and will result in an immediate permanent ban.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--text-primary)' }}>4. Disclaimer</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              The materials on SQLForge's website are provided on an 'as is' basis. SQLForge makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--text-primary)' }}>5. Limitations</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              In no event shall SQLForge or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SQLForge's website.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--text-primary)' }}>6. Governing Law</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Any claim relating to SQLForge's website shall be governed by the laws of the jurisdiction in which the company is located without regard to its conflict of law provisions.
            </p>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
