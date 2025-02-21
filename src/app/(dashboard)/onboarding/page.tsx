import ProtectedRoute from "@/components/auth/ProtectedRoute";
import OnboardingView from "@/sections/onboarding/views/onboarding-view";

export const metadata = {
  title: "Onboarding",
};

export default function Page() {
  return (
    <ProtectedRoute>
      <OnboardingView />
    </ProtectedRoute>
  );
}
