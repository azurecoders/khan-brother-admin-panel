import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Khan Brothers Engineering & Solutions",
  description:
    "Secure access to Khan Brothers Engineering & Solutions Admin Panel",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
