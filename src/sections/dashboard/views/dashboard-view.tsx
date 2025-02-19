"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardView() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
