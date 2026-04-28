import { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import PageTransition from '../components/PageTransition';

interface LeaderboardUser {
  email: string;
  solved_count: number;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await apiClient.get('/users/leaderboard');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="color-gold" size={28} />;
    if (index === 1) return <Medal className="color-silver" size={28} />;
    if (index === 2) return <Award className="color-bronze" size={28} />;
    return <span className="rank-number">{index + 1}</span>;
  };

  const renderLeaderboardContent = () => {
    if (loading) {
      return (
        <div className="centered-loader">
          <div className="loading-spinner mb-20"></div>
          Loading rankings...
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <div className="p-80 text-center">
          <Trophy size={48} className="opacity-20 mb-20" />
          <p className="text-secondary text-lg">No rankings available yet. Be the first to solve a level!</p>
        </div>
      );
    }

    return (
      <div className="data-table-container border-none br-0">
        <table className="data-table">
          <thead>
            <tr>
              <th className="rank-cell">Rank</th>
              <th>Player</th>
              <th className="text-right">Challenges Solved</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.email} className={index < 3 ? 'rank-top-3' : ''}>
                <td className="text-center">
                  <div className="flex justify-center items-center">
                    {getRankIcon(index)}
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{user.email.split('@')[0]}</span>
                    <span className="text-sm text-secondary">Member since 2026</span>
                  </div>
                </td>
                <td className="text-right">
                  <span className={`text-xl font-extrabold br-8 ${index === 0 ? 'rank-1-score' : ''}`}>
                    {user.solved_count}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <PageTransition>
      <main className="container pt-40 pb-100">
        
        <div className="text-center mb-80">
          <div className="pill-badge gold-badge mb-24">
            <Star size={18} fill="#fbbf24" /> SQL Masters
          </div>
          <h1 className="hero-title">Global Leaderboard</h1>
          <p className="hero-subtitle">
            The elite rank of database engineers. Ranked by total challenges conquered in the Forge.
          </p>
        </div>

        <div className="glass-panel max-w-900 mx-auto p-0 overflow-hidden border-1">
          {renderLeaderboardContent()}
        </div>

        <div className="text-center mt-60">
          <p className="text-secondary text-sm">
            Leaderboard updates in real-time. Keep solving to climb!
          </p>
        </div>

      </main>
    </PageTransition>
  );
}
