import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to Khan Brothers Engineering admin panel",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
