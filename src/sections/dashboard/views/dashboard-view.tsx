"use client";

import { useAuth } from "@/context/AuthContext";
import {
  fetchDashboardStat,
  fetchDashboardSummary,
} from "@/services/dashboardService";
import { useEffect, useState } from "react";

export default function DashboardView() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadData() {
      const summaryData = await fetchDashboardSummary("this-week");
      const statsData = await fetchDashboardStat("this-week");
      setSummary(summaryData);
      setStats(statsData);
    }
    loadData();
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      {summary && <pre>{JSON.stringify(summary, null, 2)}</pre>}
      {stats && <pre>{JSON.stringify(stats, null, 2)}</pre>}
    </div>
  );
}
