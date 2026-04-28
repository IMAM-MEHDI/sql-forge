import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import apiClient from '../api/client';
import { Play, CheckCircle, XCircle, ArrowLeft, Info, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './PlayLevel.css';

interface LevelDetail {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  schema_definition: string;
  solution_query: string;
  example_query?: string;
}

interface QueryResult {
  status: string;
  message: string;
  data: Record<string, unknown>[] | null;
  columns: string[] | null;
}

export default function PlayLevel() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [level, setLevel] = useState<LevelDetail | null>(null);
  const [nextLevelId, setNextLevelId] = useState<string | null>(null);
  const [query, setQuery] = useState(level?.example_query ?? '');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);

  useEffect(() => {
    // Component now remounts on ID change due to 'key={id}', so state is already fresh
    window.scrollTo(0, 0);

    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    const fetchLevelData = async () => {
      try {
        const [levelRes, allRes] = await Promise.all([
          apiClient.get(`/levels/${id}`),
          apiClient.get('/levels/')
        ]);
        
        setLevel(levelRes.data);
        setQuery(levelRes.data.example_query ?? '');
        
        const currentIndex = allRes.data.findIndex((l: {id: string}) => l.id === id);
        if (currentIndex !== -1 && currentIndex < allRes.data.length - 1) {
          setNextLevelId(allRes.data[currentIndex + 1].id);
        } else {
          setNextLevelId(null);
        }
      } catch (error) {
        console.error("Failed to fetch level", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLevelData();
  }, [id, navigate]);

  const handleRunQuery = async () => {
    setSubmitting(true);
    setResult(null);
    try {
      const res = await apiClient.post(`/levels/${id}/submit`, { query });
      setResult(res.data);
    } catch (error) {
      const err = error as { response?: { data?: { detail?: string } } };
      setResult({
        status: 'Error',
        message: err.response?.data?.detail || 'Execution failed',
        data: null,
        columns: null
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatCellValue = (value: unknown): string => {
    if (value === null || value === undefined) return '';
    
    switch (typeof value) {
      case 'string':
        return value;
      case 'number':
      case 'boolean':
      case 'bigint':
        return String(value);
      case 'object':
        try {
          return JSON.stringify(value);
        } catch {
          return '[Complex Data]';
        }
      default:
        return '';
    }
  };

  const getDifficultyBadgeClass = (difficulty: string) => {
    return difficulty === 'Easy' ? 'badge-success' : 'badge-info';
  };

  const getResultStatusClass = (status: string) => {
    return status === 'Success' ? 'success' : 'error';
  };

  if (loading) return <div className="container centered-loader">Loading level...</div>;
  if (!level) return <div className="container centered-loader">Level not found.</div>;

  return (
    <PageTransition variant="zoom">
      <div className="container play-container">
        
        {/* Header Navigation */}
        <div className="play-header">
          <Link to="/dashboard" className="back-link">
            <ArrowLeft size={18} /> Back to Challenges
          </Link>
          <div className="difficulty-group">
            <span className="badge badge-info">{level.topic}</span>
            <span className={`badge ${getDifficultyBadgeClass(level.difficulty)}`}>{level.difficulty}</span>
          </div>
        </div>

        <div className="play-grid">
          
          {/* Left Side: Description & Schema (Stacked on Mobile) */}
          <div className="play-sidebar">
            <div className="glass-panel level-info-panel">
              <h1 className="level-title">{level.title}</h1>
              <div className="level-desc-group">
                <Info size={20} className="shrink-0 mt-4" />
                <p className="m-0">{level.description}</p>
              </div>
            </div>

            <div className="glass-panel schema-panel">
              <div className="schema-header">
                <Database size={20} color="var(--accent-primary)" />
                <h3 className="m-0">Table Schema</h3>
              </div>
              <div className="schema-code-box">
                <pre className="schema-code">
                  {level.schema_definition}
                </pre>
              </div>
            </div>
          </div>

          {/* Right Side: Editor & Results */}
          <div className="editor-results-area">
            
            <div className="glass-panel editor-wrapper">
              <div className="editor-header">
                <span className="editor-label">SQL EDITOR</span>
                <button 
                  onClick={handleRunQuery} 
                  disabled={submitting} 
                  className="btn-primary run-btn"
                >
                  {submitting ? 'Running...' : <><Play size={16} /> Run Query</>}
                </button>
              </div>
              <div className="editor-container">
                <Editor
                  height="100%"
                  defaultLanguage="sql"
                  theme="vs-dark"
                  value={query}
                  onChange={(val) => setQuery(val || '')}
                  options={{ 
                    minimap: { enabled: false }, 
                    fontSize: 20, 
                    padding: { top: 30, bottom: 30 },
                    scrollBeyondLastLine: false,
                    fontFamily: 'JetBrains Mono, monospace',
                    automaticLayout: true,
                    roundedSelection: true,
                    renderLineHighlight: 'all',
                    cursorStyle: 'line',
                    cursorBlinking: 'smooth',
                    smoothScrolling: true,
                    lineNumbersMinChars: 4,
                    glyphMargin: false,
                    folding: false,
                    scrollbar: {
                      vertical: 'hidden',
                      horizontal: 'hidden'
                    }
                  }}
                />
              </div>
            </div>

            {/* Results Display */}
            <AnimatePresence mode="wait">
              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`glass-panel result-${getResultStatusClass(result.status)}`}
                >
                  <div className="result-header">
                    {result.status === 'Success' ? (
                      <CheckCircle color="var(--success)" size={24} />
                    ) : (
                      <XCircle color="var(--error)" size={24} />
                    )}
                    <h3 className={`result-title text-${getResultStatusClass(result.status)}`}>
                      {result.status === 'Success' ? 'Challenge Complete!' : 'Query Failed'}
                    </h3>
                  </div>
                  
                  <p className="result-message">{result.message}</p>

                  {result.status === 'Success' && nextLevelId && (
                    <button 
                      onClick={() => navigate(`/level/${nextLevelId}`)}
                      className="btn-primary next-btn"
                    >
                      Next Challenge →
                    </button>
                  )}

                  {result.data && result.data.length > 0 && result.columns && (
                    <div className="data-table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            {result.columns.map((col: string) => <th key={col}>{col}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {result.data.map((row: Record<string, unknown>, idx: number) => (
                            <tr key={`row-${idx}-${JSON.stringify(row).slice(0, 32)}`}>
                              {result.columns?.map((col: string) => (
                                <td key={col}>{formatCellValue(row[col])}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
