import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, ChevronLeft, FileCode, Database } from 'lucide-react';
import Editor from '@monaco-editor/react';
import apiClient from '../api/client';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface LevelDetail {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: Difficulty;
  schema_definition: string;
  solution_query: string;
  example_query?: string;
  expected_output: string;
}

interface LevelFormData {
  title: string;
  description: string;
  difficulty: Difficulty;
  topic: string;
  schema_definition: string;
  expected_output: string;
}

export default function LevelEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id && id !== 'new';

  const [formData, setFormData] = useState<LevelFormData>({
    title: '',
    description: '',
    difficulty: 'Easy',
    topic: '',
    schema_definition: '-- Enter SQL schema here (e.g., CREATE TABLE...)\n',
    expected_output: '[]'
  });

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const fetchLevel = async () => {
        try {
          const res = await apiClient.get(`/levels/${id}`);
          setFormData({
            ...res.data,
            expected_output: JSON.stringify(res.data.expected_output, null, 2)
          });
        } catch (err) {
          console.error('Failed to fetch level:', err);
          alert('Failed to load level data');
          navigate('/admin');
        } finally {
          setLoading(false);
        }
      };
      fetchLevel();
    }
  }, [id, isEditing, navigate]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty,
        topic: formData.topic,
        schema_definition: formData.schema_definition,
        expected_output: JSON.parse(formData.expected_output)
      };

      if (isEditing) {
        await apiClient.put(`/levels/${id}`, payload);
      } else {
        await apiClient.post('/levels', payload);
      }
      navigate('/admin');
    } catch (err) {
      console.error('Failed to save level:', err);
      alert('Failed to save level. Check JSON format for expected output.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="container centered-loader">Loading editor...</div>;

  return (
    <PageTransition>
      <main className="container pb-80">
        <div className="page-header">
          <motion.button 
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin')} 
            className="btn-secondary btn-icon" 
            aria-label="Back to Admin Dashboard"
            title="Back to Admin Dashboard"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <h1 className="m-0">{isEditing ? 'Edit Challenge' : 'Create New Challenge'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel form-stack">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Challenge Title</label>
              <input 
                id="title"
                type="text" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                placeholder="e.g., Select All Customers"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="difficulty">Difficulty Level</label>
              <select 
                id="difficulty"
                value={formData.difficulty} 
                onChange={(e) => setFormData({...formData, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard'})}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="topic">Topic Category</label>
            <input 
              id="topic"
              type="text" 
              value={formData.topic} 
              onChange={(e) => setFormData({...formData, topic: e.target.value})} 
              placeholder="e.g., Basic SELECT, Joins, Aggregations"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Challenge Description & Instructions</label>
            <textarea 
              id="description"
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              rows={4}
              placeholder="Provide clear instructions for the student..."
              required 
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="schema_definition" className="flex items-center gap-8">
                <Database size={14} /> Schema Definition (SQL)
              </label>
              <div className="editor-frame">
                <Editor
                  height="100%"
                  defaultLanguage="sql"
                  theme="vs-dark"
                  value={formData.schema_definition}
                  onChange={(val) => setFormData({...formData, schema_definition: val || ''})}
                  options={{ 
                    minimap: { enabled: false }, 
                    fontSize: 14,
                    fontFamily: 'JetBrains Mono, monospace',
                    padding: { top: 10 }
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="expected_output" className="flex items-center gap-8">
                <FileCode size={14} /> Expected Output (JSON)
              </label>
              <div className="editor-frame">
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  theme="vs-dark"
                  value={formData.expected_output}
                  onChange={(val) => setFormData({...formData, expected_output: val || '[]'})}
                  options={{ 
                    minimap: { enabled: false }, 
                    fontSize: 14,
                    fontFamily: 'JetBrains Mono, monospace',
                    padding: { top: 10 }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-16 justify-end mt-24 border-top pt-24">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button" 
              onClick={() => navigate('/admin')} 
              className="btn-secondary flex items-center gap-8"
            >
              <X size={20} /> Cancel
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={saving} 
              className="btn-primary flex items-center gap-8"
            >
              <Save size={20} /> {saving ? 'Saving...' : 'Save Challenge'}
            </motion.button>
          </div>
        </form>
      </main>
    </PageTransition>
  );
}
