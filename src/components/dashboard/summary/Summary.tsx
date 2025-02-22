"use client";

import { fetchDashboardSummary } from "@/services/dashboardService";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";

interface SummaryProps {
  filter: "this-week" | "prev-week";
}

interface SummaryData {
  current: {
    active_users: number;
    clicks: number;
    appearance: number;
  };
  previous: {
    active_users: number;
    clicks: number;
    appearance: number;
  };
}

export default function Summary({ filter }: SummaryProps) {
  const [summary, setSummary] = useState<SummaryData | null>(null);

  useEffect(() => {
    async function loadData() {
      const summaryData = await fetchDashboardSummary(filter);
      setSummary(summaryData);
    }
    loadData();
  }, [filter]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: { xs: "wrap", lg: "nowrap" },
        mt: 2,
      }}
    >
      {summary && (
        <>
          <SummaryCard
            title="Total Active Users"
            current={summary.current.active_users}
            previous={summary.previous.active_users}
          />
          <SummaryCard
            title="Total Clicks"
            current={summary.current.clicks}
            previous={summary.previous.clicks}
          />
          <SummaryCard
            title="Total Appearances"
            current={summary.current.appearance}
            previous={summary.previous.appearance}
          />
        </>
      )}
    </Box>
  );
}
