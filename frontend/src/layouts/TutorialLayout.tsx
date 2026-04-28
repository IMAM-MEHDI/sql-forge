import { useState } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { tutorialData } from '../data/tutorialData';
import { ArrowLeft, ChevronRight, Menu, X, Book, Database, Shield, FileText } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import './TutorialLayout.css';

const TutorialLayout = () => {
  const { topicId } = useParams();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [prevPath, setPrevPath] = useState(location.pathname);

  // Close sidebar on route change without useEffect
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setIsMobileOpen(false);
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'SQL Tutorial': return <Book size={16} />;
      case 'SQL Database': return <Database size={16} />;
      case 'SQL Cert': return <Shield size={16} />;
      case 'SQL References': return <FileText size={16} />;
      default: return <Book size={16} />;
    }
  };

  return (
    <div className="tutorial-layout">
      {/* Mobile Overlay */}
      <button 
        className={`sidebar-overlay ${isMobileOpen ? 'show' : ''}`} 
        onClick={() => setIsMobileOpen(false)}
        onKeyDown={(e) => e.key === 'Escape' && setIsMobileOpen(false)}
        tabIndex={0}
        aria-label="Close sidebar"
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/tutorials" className="back-link">
            <ArrowLeft size={16} /> Back to Overview
          </Link>
        </div>
        
        <div className="sidebar-content">
          {(() => {
            const categories = [...new Set(Object.values(tutorialData).map(t => t.category))];
            return categories.map(cat => (
              <div key={cat}>
                <h4 className="category-title">
                  {getCategoryIcon(cat)}
                  {cat}
                </h4>
                <nav className="topic-nav">
                  {Object.values(tutorialData)
                    .filter(t => t.category === cat)
                    .map((topic) => (
                      <Link 
                        key={topic.id} 
                        to={`/tutorials/${topic.id}`}
                        className={`topic-link ${topic.id === topicId ? 'active' : ''}`}
                      >
                        <span className="topic-link-content">
                          {topic.title}
                        </span>
                        {topic.id === topicId && <ChevronRight size={14} />}
                      </Link>
                    ))}
                </nav>
              </div>
            ));
          })()}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="content-area tutorial-content">
        
        {/* Animated Breadcrumbs */}
        <div className="breadcrumb-container">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="breadcrumb-item"
          >
            <Link to="/tutorials" className="breadcrumb-link">
              <Book size={14} /> Tutorials
            </Link>
          </motion.div>
          
          <div className="breadcrumb-separator"><ChevronRight size={14} /></div>
          
          <motion.div 
            key={topicId ? tutorialData[topicId]?.category : 'category'}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="breadcrumb-item"
          >
            {topicId ? tutorialData[topicId]?.category : 'Loading...'}
          </motion.div>
          
          <div className="breadcrumb-separator"><ChevronRight size={14} /></div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={topicId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="breadcrumb-item active"
            >
              {topicId ? tutorialData[topicId]?.title : ''}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={topicId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="content-transition-wrapper"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Toggle Button */}
      <button 
        className="mobile-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle Menu"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default TutorialLayout;
