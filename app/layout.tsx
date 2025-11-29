import ApolloClientProviderComponent from "@/component/ApolloClient";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Khan Brothers | Admin",
  description: "Admin Panel for Khan Brothers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <ApolloClientProviderComponent>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ApolloClientProviderComponent>
      </body>
    </html>
  );
}
