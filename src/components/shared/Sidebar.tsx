import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Sidebar({ width }: { width: number }) {
  return (
    <aside
      style={{ width, borderRight: "1px solid #919EAB1F", padding: "16px" }}
    >
      <img
        src="/logo.png"
        alt=""
        style={{
          width: "48px",
          height: "48px",
          margin: "24px auto 8px 12px",
        }}
      />
      <Box
        sx={{
          padding: "16px 0 0 12px",
        }}
      >
        <Typography variant="body2" paddingBottom="8px">
          Overview
        </Typography>
        <Box
          component={Link}
          href={"/"}
          sx={{
            padding: "12px",
            paddingLeft: "0",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            textDecoration: "none",
            color: "#000",
          }}
        >
          <img src="/icons/dash-icon.svg" alt="" />
          <Typography variant="body2">Dashboard</Typography>
        </Box>
        <Box
          component={Link}
          href={"/onboarding"}
          sx={{
            padding: "12px",
            paddingLeft: "0",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            textDecoration: "none",
            color: "#000",
          }}
        >
          <img src="/icons/onboard-icon.svg" alt="" />
          <Typography variant="body2">Onboarding</Typography>
        </Box>
      </Box>
    </aside>
  );
}
