import Dashboard from "@/component/Dashboard";
import ProtectedRoute from "@/component/ProtectedRoute";

export default function Home() {
  return (
    <>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </>
  );
}
