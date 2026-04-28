import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, ChevronLeft } from 'lucide-react';
import apiClient from '../api/client';

interface Level {
  id: string;
  title: string;
  difficulty: string;
  topic: string;
}

export default function AdminDashboard() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleDelete = async (id: string) => {
    if (!globalThis.confirm('Are you sure you want to delete this level?')) return;
    try {
      await apiClient.delete(`/levels/${id}`);
      setLevels(levels.filter(l => l.id !== id));
    } catch {
      alert('Failed to delete level');
    }
  };

  const getDifficultyBadgeClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'badge-success';
      case 'Medium': return 'badge-info';
      default: return 'badge-error';
    }
  };

  return (
    <main className="container pb-80">
        <div className="page-header">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="btn-secondary btn-icon" 
            aria-label="Back to Dashboard"
            title="Back to Dashboard"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="m-0">Admin Dashboard</h1>
          <Link to="/admin/level/new" className="btn-primary ml-auto flex items-center gap-8">
            <Plus size={20} /> Create Level
          </Link>
        </div>

        {loading ? (
          <div className="centered-loader">Loading levels...</div>
        ) : (
          <div className="glass-panel p-0 overflow-hidden">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Difficulty</th>
                  <th>Topic</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {levels.map((level) => (
                  <tr key={level.id}>
                    <td>{level.title}</td>
                    <td>
                      <span className={`badge ${getDifficultyBadgeClass(level.difficulty)}`}>
                        {level.difficulty}
                      </span>
                    </td>
                    <td>{level.topic}</td>
                    <td>
                      <div className="actions-cell">
                        <Link 
                          to={`/admin/level/${level.id}`} 
                          className="btn-secondary btn-icon" 
                          aria-label={`Edit ${level.title}`}
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(level.id)} 
                          className="btn-secondary btn-icon btn-danger-outline" 
                          aria-label={`Delete ${level.title}`}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </main>
  );
}
