import { Link } from 'react-router-dom';
import { BookOpen, Search, Layers, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';
import { tutorialData } from '../data/tutorialData';
import PageTransition from '../components/PageTransition';

export default function SqlTutorials() {
  return (
    <PageTransition variant="slide">
      <main className="container" style={{ paddingBottom: '100px', paddingTop: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', padding: '8px 16px', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '24px' }}>
            <GraduationCap size={18} /> SQLForge Academy
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 800, marginBottom: '24px' }}>Level Up Your SQL Skills</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            Our structured curriculum takes you from absolute beginner to database engineer. 
            Select a topic to start your interactive learning journey.
          </p>
        </div>

        {(() => {
          const categories = [...new Set(Object.values(tutorialData).map(t => t.category))];
          return categories.map(cat => (
            <section key={cat} style={{ marginBottom: '80px' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2rem)', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '4px', height: '32px', background: 'var(--accent-primary)', borderRadius: '4px' }}></div>
                {cat}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(300px, 100%, 360px), 1fr))', gap: '24px' }}>
                {Object.values(tutorialData)
                  .filter(topic => topic.category === cat)
                  .map((topic) => (
                    <Link 
                      key={topic.id} 
                      to={`/tutorials/${topic.id}`} 
                      className="glass-panel" 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        transition: 'all 0.3s ease', 
                        textDecoration: 'none', 
                        color: 'inherit',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', padding: '12px', borderRadius: '12px' }}>
                          {topic.id.includes('join') ? <Layers size={24} /> : 
                           topic.id.includes('select') ? <Search size={24} /> : 
                           topic.id.includes('db') ? <Layers size={24} /> :
                           <BookOpen size={24} />}
                        </div>
                        <span className={`badge ${topic.difficulty === 'Beginner' ? 'badge-success' : topic.difficulty === 'Intermediate' ? 'badge-info' : 'badge-error'}`}>
                          {topic.difficulty}
                        </span>
                      </div>
                      
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{topic.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px', flexGrow: 1 }}>
                        {topic.explanation.substring(0, 120)}...
                      </p>
        
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                        Start Tutorial <ArrowRight size={16} />
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          ));
        })()}

        <section style={{ marginTop: '120px', background: 'rgba(0,102,255,0.02)', borderRadius: '32px', padding: 'clamp(24px, 5vw, 80px)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px' }}>
              <div style={{ color: 'var(--success)', marginBottom: '20px' }}><ShieldCheck size={48} /></div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '24px' }}>Why Learn With Us?</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '32px' }}>
                Traditional tutorials are passive. At SQLForge, we combine academic depth with practical execution. 
                Learn a concept, see an example, and then jump straight into our sandbox to prove you've mastered it.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/levels-guide" className="btn-primary">How it Works</Link>
                <Link to="/blog" className="btn-secondary">Read Our Blog</Link>
              </div>
            </div>
            <div style={{ flex: '1 1 300px' }}>
              <div className="glass-panel" style={{ background: 'rgba(0,0,0,0.4)' }}>
                <h4 style={{ marginBottom: '16px' }}>Curriculum Stats</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Total Modules</span>
                    <span style={{ fontWeight: 700 }}>15</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Hands-on Challenges</span>
                    <span style={{ fontWeight: 700 }}>50+</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Learning Hours</span>
                    <span style={{ fontWeight: 700 }}>12h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
