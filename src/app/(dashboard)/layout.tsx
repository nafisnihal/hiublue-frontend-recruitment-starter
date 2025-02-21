"use client";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const sidebarWidth = 280;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/login");
      }
      setCheckingAuth(false);
    }
  }, [user, isLoading, router]);

  // ✅ Prevent rendering the dashboard layout until auth is confirmed
  if (isLoading || checkingAuth) return null;

  if (!user) return null;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
      <Sidebar width={sidebarWidth} />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
