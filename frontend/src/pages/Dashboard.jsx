import { useEffect, useState } from "react";

import {
  getStats,
  getInteractions,
} from "../services/api";

import StatCard from "../components/StatCards";
import InteractionTable from "../components/InteractionTable";

const Dashboard = ({ token, onLogout }) => {
  const [stats, setStats] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsData, interactionsData] =
          await Promise.all([
            getStats(token),
            getInteractions(token),
          ]);

        setStats(statsData);
        setInteractions(
          interactionsData.interactions
        );
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("adminToken");
          onLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [token, onLogout]);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Discord Bot Dashboard</h1>
          <p>Monitor bot interactions and reports.</p>
        </div>

        <button onClick={onLogout}>
          Logout
        </button>
      </header>

      {stats && (
        <div className="stats-grid">
          <StatCard
            title="Total Interactions"
            value={stats.totalInteractions}
          />

          <StatCard
            title="/status"
            value={stats.statusCount}
          />

          <StatCard
            title="/report"
            value={stats.reportCount}
          />

          <StatCard
            title="Successful"
            value={stats.successfulCount}
          />

          <StatCard
            title="Failed"
            value={stats.failedCount}
          />
        </div>
      )}

      <section>
        <h2>Recent Interactions</h2>

        <InteractionTable
          interactions={interactions}
        />
      </section>
    </div>
  );
};

export default Dashboard;