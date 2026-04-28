import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Server, Trophy, Play, Star, ChevronRight } from 'lucide-react';
import apiClient from '../api/client';
import PageTransition from '../components/PageTransition';

interface Level {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  topic: string;
}

export default function Home() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const res = await apiClient.get('/levels');
        setLevels(res.data);
      } catch (err) {
        console.error('Failed to fetch levels:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLevels();
  }, []);

  return (
    <PageTransition>
      <main className="container" style={{ paddingBottom: '120px' }}>
        
        {/* Hero Section */}
        <section style={{ 
          padding: 'clamp(60px, 10vh, 120px) 0', 
          textAlign: 'center', 
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)' 
        }}>
          <div className="badge badge-info" style={{ marginBottom: '24px' }}>
            <Star size={12} style={{ marginRight: '6px' }} /> 
            New: Interactive Tutorials Added
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
            lineHeight: '1.1', 
            maxWidth: '900px', 
            margin: '0 auto 24px' 
          }}>
            Master SQL Through Gamified Challenges
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: 'clamp(1.1rem, 3vw, 1.35rem)', 
            maxWidth: '700px', 
            margin: '0 auto 48px',
            lineHeight: '1.6'
          }}>
            Write real queries, execute them in a secure sandbox, and climb the leaderboard. The fastest way to learn database engineering.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login?mode=register" className="btn-primary" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
              Start Playing Free
            </Link>
            <Link to="/tutorials" className="btn-secondary" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
              Browse Tutorials
            </Link>
          </div>
        </section>

        {/* Level Grid */}
        <section style={{ marginTop: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Challenge Labs</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Hands-on problems to test your query skills.</p>
            </div>
            <Link to="/leaderboard" className="btn-secondary" style={{ fontSize: '0.9rem' }}>
              View Rankings <ChevronRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>Loading challenges...</div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(300px, 100%, 360px), 1fr))', 
              gap: '24px' 
            }}>
              {levels.map((level) => (
                <div key={level.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.2s ease' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{level.title}</h3>
                    <span className={`badge ${level.difficulty === 'Easy' ? 'badge-success' : level.difficulty === 'Medium' ? 'badge-info' : 'badge-error'}`}>
                      {level.difficulty}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', flexGrow: 1, marginBottom: '24px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {level.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600 }}>#{level.topic}</span>
                    <Link to={`/level/${level.id}`} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                      <Play size={16} /> Play
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Feature Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '32px', 
          marginTop: '120px' 
        }}>
          <div className="glass-panel" style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-primary)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}><Code size={48} /></div>
            <h3>Real SQL Sandbox</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>Execute actual PostgreSQL queries in a secure, isolated environment. No multiple choice.</p>
          </div>
          <div className="glass-panel" style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--success)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}><Server size={48} /></div>
            <h3>Instant Validation</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>Our validation engine checks your output against the expected result instantly.</p>
          </div>
          <div className="glass-panel" style={{ textAlign: 'center' }}>
            <div style={{ color: '#f59e0b', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}><Trophy size={48} /></div>
            <h3>Track Progress</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>Earn points, unlock harder levels, and master complex JOINs and window functions.</p>
          </div>
        </div>

      </main>
    </PageTransition>
  );
}
