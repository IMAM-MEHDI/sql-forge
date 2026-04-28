import { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { Trophy, CheckCircle, Clock, LayoutDashboard, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

interface DashboardData {
  solved_count: number;
  recent_activity: {
    level_title: string;
    solved_at: string;
    difficulty: string;
  }[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await apiClient.get('/users/dashboard');
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="container centered-loader">Loading dashboard...</div>;

  return (
    <PageTransition>
      <main className="container pt-40 pb-100">
        
        <div className="flex justify-between items-center mb-40 flex-wrap gap-20">
          <div>
            <h1 className="mb-8">Welcome Back</h1>
            <p className="text-secondary">Track your progress and continue your SQL journey.</p>
          </div>
          <Link to="/tutorials" className="btn-primary">
            Resume Learning <ChevronRight size={18} />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="glass-panel stat-card">
            <div className="stat-icon-box icon-box-success">
              <CheckCircle size={28} />
            </div>
            <div>
              <p className="stat-label">Challenges Solved</p>
              <h2 className="stat-value">{data?.solved_count || 0}</h2>
            </div>
          </div>

          <div className="glass-panel stat-card">
            <div className="stat-icon-box icon-box-primary">
              <Trophy size={28} />
            </div>
            <div>
              <p className="stat-label">Global Rank</p>
              <h2 className="stat-value">Top 15%</h2>
            </div>
          </div>

          <div className="glass-panel stat-card">
            <div className="stat-icon-box icon-box-warning">
              <Clock size={28} />
            </div>
            <div>
              <p className="stat-label">Current Streak</p>
              <h2 className="stat-value">4 Days</h2>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-panel p-0 overflow-hidden">
          <div className="p-24 border-bottom flex items-center gap-12">
            <LayoutDashboard size={20} color="var(--accent-primary)" />
            <h3 className="m-0">Recent Activity</h3>
          </div>
          
          <div className="data-table-container border-none br-0">
            {data?.recent_activity.length === 0 ? (
              <div className="p-60 text-center text-secondary">
                No activity yet. Start with your first challenge!
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Challenge</th>
                    <th>Difficulty</th>
                    <th className="text-right">Solved At</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.recent_activity.map((activity) => (
                    <tr key={`${activity.level_title}-${activity.solved_at}`}>
                      <td className="font-semibold">{activity.level_title}</td>
                      <td>
                        <span className={`badge ${activity.difficulty === 'Easy' ? 'badge-success' : 'badge-info'}`}>
                          {activity.difficulty}
                        </span>
                      </td>
                      <td className="text-right text-secondary text-sm">
                        {new Date(activity.solved_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </main>
    </PageTransition>
  );
}
