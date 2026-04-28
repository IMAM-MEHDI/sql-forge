import { Calendar, User, Clock, ArrowRight, TrendingUp, Database } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const articles = [
  {
    title: 'Mastering PostgreSQL Window Functions',
    excerpt: 'Deep dive into OVER, PARTITION BY, and how to perform calculations across sets of rows without GROUP BY.',
    author: 'Elena Rossi',
    date: 'April 25, 2026',
    readTime: '8 min read',
    category: 'Advanced SQL',
    color: '#8b5cf6'
  },
  {
    title: 'SQL vs NoSQL: Choosing the Right Tool for 2026',
    excerpt: 'When to stick with ACID compliance and when to scale horizontally with document stores.',
    author: 'Marcus Chen',
    date: 'April 20, 2026',
    readTime: '12 min read',
    category: 'Architecture',
    color: '#3b82f6'
  },
  {
    title: 'Query Optimization 101: Understanding EXPLAIN ANALYZE',
    excerpt: 'Learn how to read query plans and identify bottlenecks in your database execution.',
    author: 'Sarah Jenkins',
    date: 'April 15, 2026',
    readTime: '10 min read',
    category: 'Performance',
    color: '#10b981'
  },
  {
    title: 'The Rise of Vector Databases in the AI Era',
    excerpt: 'How traditional relational databases are adapting to store and query high-dimensional vector embeddings.',
    author: 'Elena Rossi',
    date: 'April 10, 2026',
    readTime: '15 min read',
    category: 'AI & Data',
    color: '#ec4899'
  }
];

export default function Blog() {
  return (
    <PageTransition>
      <main className="container" style={{ paddingBottom: '100px', paddingTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', fontWeight: 800, margin: 0 }}>The Forge Blog</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '16px' }}>Insights, tutorials, and news from the world of data engineering.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span className="badge badge-info" style={{ cursor: 'pointer' }}>All Posts</span>
            <span className="badge" style={{ cursor: 'pointer', border: '1px solid var(--border)' }}>Technical</span>
            <span className="badge" style={{ cursor: 'pointer', border: '1px solid var(--border)' }}>Product News</span>
          </div>
        </div>

        {/* Featured Post */}
        <section className="glass-panel" style={{ padding: 'clamp(24px, 5vw, 60px)', marginBottom: '80px', display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap', border: '1px solid var(--accent-glow)' }}>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', marginBottom: '20px', fontWeight: 700, fontSize: '0.9rem' }}>
              <TrendingUp size={18} /> FEATURED ARTICLE
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginBottom: '24px', lineHeight: '1.2' }}>Why Every Developer Needs to Master SQL in 2026</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '32px' }}>
              Despite the rise of specialized databases, SQL remains the lingua franca of data. We explore why relational mastery is more important than ever in the age of LLMs and big data.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <User size={16} /> Marcus Chen
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <Calendar size={16} /> April 27, 2026
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <Clock size={16} /> 15 min read
              </div>
            </div>
            <button className="btn-primary" style={{ padding: '14px 32px' }}>Read Full Article</button>
          </div>
          <div className="desktop-only" style={{ flex: '1 1 300px', height: '400px', background: 'linear-gradient(45deg, var(--bg-dark), var(--bg-panel))', borderRadius: '24px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '8rem', opacity: 0.1, fontWeight: 900, transform: 'rotate(-15deg)' }}>SQL</div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--accent-primary)' }}>
               <Database size={120} style={{ filter: 'drop-shadow(0 0 20px var(--accent-glow))' }} />
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 100%, 400px), 1fr))', gap: '40px' }}>
          {articles.map((article, i) => (
            <div key={i} className="glass-panel" style={{ padding: 'clamp(24px, 4vw, 40px)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s ease', cursor: 'pointer' }}>
              <div style={{ display: 'inline-block', color: article.color, background: `${article.color}20`, padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '24px', border: `1px solid ${article.color}40`, width: 'fit-content' }}>
                {article.category}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', lineHeight: '1.3' }}>{article.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', flexGrow: 1, lineHeight: '1.6' }}>
                {article.excerpt}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{article.date}</div>
                <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Read More <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <button className="btn-secondary" style={{ padding: '12px 40px' }}>Load More Articles</button>
        </div>
      </main>
    </PageTransition>
  );
}
