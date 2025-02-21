import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardView from "@/sections/dashboard/views/dashboard-view";

export const metadata = {
  title: "Dashbord",
};

export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardView />
    </ProtectedRoute>
  );
}
