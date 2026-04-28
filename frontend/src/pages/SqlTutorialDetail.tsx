import { useParams, Link } from 'react-router-dom';
import { tutorialData } from '../data/tutorialData';
import { BookOpen, Play, ExternalLink, Zap, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import './SqlTutorialDetail.css';

export default function SqlTutorialDetail() {
  const { topicId } = useParams();
  const currentTopic = topicId ? tutorialData[topicId] : null;
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentTopic) {
    return (
      <div className="container not-found-container">
        <h2>Tutorial Not Found</h2>
        <Link to="/tutorials" className="btn-secondary mt-8">Back to Tutorials</Link>
      </div>
    );
  }

  return (
    <main className="tutorial-content">
      <h1 className="hero-title tutorial-header">{currentTopic.title}</h1>
      
      <div className="glass-panel tutorial-explanation">
        {currentTopic.explanation}
      </div>

      <h2 className="section-title">
        <BookOpen size={24} color="var(--accent-primary)" /> Syntax Example
      </h2>
      <div className="code-editor-mockup">
        <div className="editor-header">
          <div className="window-controls">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
          <button 
            onClick={() => handleCopy(currentTopic.example)}
            className="copy-button"
          >
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy SQL'}
          </button>
        </div>
        <pre className="code-block">
          {currentTopic.example}
        </pre>
        
        {currentTopic.codeBreakdown && (
          <div className="breakdown-section">
            <h4 className="breakdown-title">
              Code Elements Breakdown
            </h4>
            <div className="breakdown-content">
              {currentTopic.codeBreakdown}
            </div>
          </div>
        )}
      </div>

      <div className="practice-grid">
        <div className="glass-panel practice-panel">
          <h3 className="panel-title">
            <Zap size={20} color="#f59e0b" fill="#f59e0b" /> Try it Yourself
          </h3>
          <p className="panel-description">
            Practice makes perfect. Copy the query below and test it in our interactive SQL sandbox.
          </p>
          {currentTopic.practiceQuery && (
            <div className="practice-query-box">
              <code>
                {currentTopic.practiceQuery}
              </code>
            </div>
          )}
          <Link to="/" className="btn-secondary w-full">
            Open Sandbox <ExternalLink size={16} />
          </Link>
        </div>

        {currentTopic.gameLevelId && (
          <div className="glass-panel level-panel">
            <h3 className="panel-title">
              <Play size={20} color="var(--success)" /> Interactive Level
            </h3>
            <p className="panel-description">
              Ready to test your skills? We have a specific challenge designed for this topic.
            </p>
            <div className="level-badge">
               <p>{currentTopic.gameLevelTitle || `Level ${currentTopic.gameLevelId}: Master the Basics`}</p>
            </div>
            <Link to={`/level/${currentTopic.gameLevelId}`} className="btn-primary w-full">
              Play Now →
            </Link>
          </div>
        )}
      </div>
      
      <div className="navigation-footer">
         <Link to="/tutorials" className="btn-secondary">Overview</Link>
         {(() => {
            const topics = Object.values(tutorialData);
            const currentIndex = topics.findIndex(t => t.id === topicId);
            const nextTopic = topics[currentIndex + 1];
            if (nextTopic) {
              return (
                <Link to={`/tutorials/${nextTopic.id}`} className="btn-primary">
                  Next: {nextTopic.title}
                </Link>
              );
            }
            return <Link to="/tutorials" className="btn-primary">Finish Course</Link>;
         })()}
      </div>
    </main>
  );
}
