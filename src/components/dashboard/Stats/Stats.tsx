"use client";

import { fetchDashboardStat } from "@/services/dashboardService";
import { Box, Card, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
interface StatProps {
  filter: "this-week" | "prev-week";
}

interface ChartData {
  website_visits: {
    [key: string]: {
      desktop: number;
      mobile: number;
    };
  };
  offers_sent: {
    [key: string]: number;
  };
}

export default function Stats({ filter }: StatProps) {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDashboardStat(filter);
      setChartData(data);
    }
    fetchData();
  }, [filter]);

  if (!chartData) return null;

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Extracted data for website visits
  const desktopVisits = days.map(
    (day) => chartData.website_visits[day.toLowerCase()].desktop
  );
  const mobileVisits = days.map(
    (day) => chartData.website_visits[day.toLowerCase()].mobile
  );

  // Extracted data for offers sent
  const offersSent = days.map(
    (day) => chartData.offers_sent[day.toLowerCase()]
  );

  return (
    <Box
      sx={{
        display: "flex",
        gap: "24px",
        alignItems: "center",
        flexWrap: { xs: "wrap", lg: "nowrap" },
        mt: "24px",
      }}
    >
      <Card
        sx={{
          width: { xs: "100%", lg: "calc(50% - 12px)" },
          p: 3,
        }}
      >
        <Typography variant="h6" pb={3}>
          Website visits
        </Typography>
        <Chart
          type="bar"
          height={300}
          series={[
            { name: "Desktop", data: desktopVisits, color: "#007867" },
            { name: "Mobile", data: mobileVisits, color: "#FFAB00" },
          ]}
          options={{
            chart: { type: "bar", height: 300, toolbar: { show: false } },
            plotOptions: { bar: { horizontal: false, columnWidth: "50%" } },
            colors: ["#007867", "#FFAB00"],
            dataLabels: { enabled: false },
            xaxis: { categories: days.map((d) => d.slice(0, 3)) },
            legend: {
              position: "top",
              horizontalAlign: "right",
              markers: { size: 8 },
              itemMargin: { horizontal: 10 },
            },
          }}
        />
      </Card>
      <Card
        sx={{
          width: { xs: "100%", lg: "calc(50% - 12px)" },
          p: 3,
        }}
      >
        <Typography variant="h6" pb={3}>
          Offers sent
        </Typography>
        <Chart
          type="line"
          height={300}
          series={[{ name: "Offers Sent", data: offersSent, color: "#000000" }]}
          options={{
            chart: { toolbar: { show: false } },
            xaxis: { categories: days.map((d) => d.slice(0, 3)) },
            stroke: { curve: "smooth" },
          }}
        />
      </Card>
    </Box>
  );
}
