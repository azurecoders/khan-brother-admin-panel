import Dashboard from "@/component/Dashboard";
import ProtectedRoute from "@/component/ProtectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Khan Brothers Engineering admin dashboard - Manage your business",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function Home() {
  return (
    <>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </>
  );
}
