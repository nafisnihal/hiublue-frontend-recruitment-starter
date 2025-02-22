"use client";

import OffersTable from "@/components/dashboard/Offers/OffersTable";
import Stats from "@/components/dashboard/Stats/Stats";
import Summary from "@/components/dashboard/summary/Summary";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";

export default function DashboardView() {
  const [filter, setFilter] = useState<"this-week" | "prev-week">("this-week");
  return (
    <Box sx={{ px: "40px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "25px",
        }}
      >
        <Typography variant="h4">Dashboard</Typography>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          sx={{
            width: "140px",
            height: "40px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "8px",
            border: "1px solid #919EAB29",
          }}
        >
          <MenuItem value="this-week">This Week</MenuItem>
          <MenuItem value="prev-week">Previous Week</MenuItem>
        </Select>
      </Box>
      <Summary filter={filter} />
      <Stats filter={filter} />
      <OffersTable />
    </Box>
  );
}
