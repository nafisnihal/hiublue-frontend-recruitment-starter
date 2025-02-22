"use client";
import { useAuth } from "@/context/AuthContext";
import LoginView from "@/sections/login/views/login-view";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  return <LoginView />;
}
