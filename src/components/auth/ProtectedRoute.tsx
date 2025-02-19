"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return <div>Loading...</div>;
  return children;
}
