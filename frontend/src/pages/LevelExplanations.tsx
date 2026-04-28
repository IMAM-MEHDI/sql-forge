import { Shield, Trophy, Cpu, Code } from 'lucide-react';
import './LevelExplanations.css';

export default function LevelExplanations() {
  return (
    <main className="container explanations-main">
      <div className="explanations-header">
        <h1 className="explanations-title">How the Forge Works</h1>
        <p className="explanations-subtitle">
          A guide to mastering SQL challenges, navigating the sandbox, and climbing the ranks.
        </p>
      </div>

      <section className="feature-section">
        <div className="feature-grid">
          <div className="glass-panel">
            <div className="feature-icon-box cpu"><Cpu size={32} /></div>
            <h3>1. The Sandbox</h3>
            <p className="feature-text">
              Every challenge runs in an isolated PostgreSQL sandbox. You are provided with a schema and sample data. Your task is to write a query that produces the exact result set expected by the validator.
            </p>
          </div>
          <div className="glass-panel">
            <div className="feature-icon-box code"><Code size={32} /></div>
            <h3>2. Write & Execute</h3>
            <p className="feature-text">
              Use our built-in Monaco editor (the same engine behind VS Code) to write your SQL. Hit "Run Query" to see your results. If they match the target, you pass!
            </p>
          </div>
          <div className="glass-panel">
            <div className="feature-icon-box trophy"><Trophy size={32} /></div>
            <h3>3. Earn Points</h3>
            <p className="feature-text">
              Completing levels earns you points based on difficulty. Faster solutions and complex queries give you more prestige on the global leaderboard.
            </p>
          </div>
        </div>
      </section>

      <section className="tiers-section">
        <h2 className="tiers-title">Difficulty Tiers</h2>
        <div className="tiers-stack">
          <div className="glass-panel tier-panel">
            <div className="badge badge-success tier-badge">Easy</div>
            <div className="tier-info">
              <h4 className="tier-name">Fundamentals</h4>
              <p className="tier-desc">Focuses on basic SELECT statements, single-table filtering (WHERE), ordering, and basic column manipulation.</p>
            </div>
            <div className="tier-points">100 Points</div>
          </div>
          
          <div className="glass-panel tier-panel">
            <div className="badge badge-info tier-badge">Medium</div>
            <div className="tier-info">
              <h4 className="tier-name">Relational Mastery</h4>
              <p className="tier-desc">Requires combining multiple tables (JOINs), aggregating data (GROUP BY), and using aggregate functions (SUM, AVG, etc.).</p>
            </div>
            <div className="tier-points">250 Points</div>
          </div>
          
          <div className="glass-panel tier-panel">
            <div className="badge badge-error tier-badge">Hard</div>
            <div className="tier-info">
              <h4 className="tier-name">Expert Engineering</h4>
              <p className="tier-desc">Challenges involving complex subqueries, CTEs (Common Table Expressions), window functions, and database optimization.</p>
            </div>
            <div className="tier-points">500 Points</div>
          </div>
        </div>
      </section>

      <div className="glass-panel security-panel">
        <div className="security-icon"><Shield size={48} /></div>
        <h2 className="security-title">Security First</h2>
        <p className="security-desc">
          Our execution engine is highly restricted. Every query is parsed and executed under a strict sandbox user with no access to system tables or other users' data. Learn database safety as you learn SQL.
        </p>
        <a href="/login?mode=register" className="btn-primary start-journey-btn">Start Your Journey</a>
      </div>
    </main>
  );
}
