import { Database, Code, Zap, Globe, ShieldCheck } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <PageTransition>
      <main className="container" style={{ paddingBottom: '100px', paddingTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '24px', background: 'linear-gradient(to right, var(--primary), var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>
              The SQLForge Story
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
              Empowering the next generation of data engineers through hands-on, gamified mastery.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', marginBottom: '100px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '24px', color: 'var(--text-primary)' }}>Our Mission</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
                We believe that learning SQL shouldn't be about reading dry documentation or watching endless tutorials. It should be about <strong>building</strong>, <strong>breaking</strong>, and <strong>optimizing</strong>.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                SQLForge was born out of a desire to create a safe, interactive environment where developers can practice real-world database scenarios without the fear of damaging production data.
              </p>
            </div>
            <div className="glass-panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '20px', padding: '30px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '12px' }}><Database size={32} /></div>
                <h4 style={{ margin: 0 }}>Real DBs</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '12px' }}><Code size={32} /></div>
                <h4 style={{ margin: 0 }}>Real Code</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--success)', marginBottom: '12px' }}><Zap size={32} /></div>
                <h4 style={{ margin: 0 }}>Fast Feedback</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '12px' }}><Globe size={32} /></div>
                <h4 style={{ margin: 0 }}>Global Path</h4>
              </div>
            </div>
          </div>

          <section style={{ marginBottom: '100px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '48px', textAlign: 'center' }}>Why SQLForge?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              <div className="glass-panel" style={{ padding: '32px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '1.25rem' }}>
                  <ShieldCheck style={{ color: 'var(--success)' }} /> Isolated Sandbox
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Every query you write runs in a dedicated, temporary PostgreSQL schema. We've built high-level security layers to ensure you can experiment freely.
                </p>
              </div>
              <div className="glass-panel" style={{ padding: '32px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '1.25rem' }}>
                  <Code style={{ color: 'var(--primary)' }} /> Expertly Crafted Levels
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Our challenges are designed by senior database engineers to cover everything from basic SELECTs to advanced window functions and CTEs.
                </p>
              </div>
              <div className="glass-panel" style={{ padding: '32px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '1.25rem' }}>
                  <Zap style={{ color: 'var(--accent-primary)' }} /> Gamified Path
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Learning is easier when it's fun. Earn badges, climb the leaderboard, and unlock new challenges as you master more complex concepts.
                </p>
              </div>
            </div>
          </section>

          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', padding: 'clamp(32px, 5vw, 60px)', borderRadius: '24px', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '24px' }}>Ready to Master the Language of Data?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1.1rem' }}>Join thousands of developers leveling up their database skills today.</p>
            <Link to="/login?mode=register" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>Get Started for Free</Link>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
