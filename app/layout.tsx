import ApolloClientProviderComponent from "@/component/ApolloClient";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const ADMIN_URL = "https://admin.kbengsolutions.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1E40AF" },
    { media: "(prefers-color-scheme: dark)", color: "#1E3A8A" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(ADMIN_URL),
  title: {
    default: "Admin Dashboard | Khan Brothers Engineering",
    template: "%s | KB Admin",
  },
  description: "Secure admin panel for Khan Brothers Engineering & Solutions. Manage services, projects, products, and customer inquiries.",
  applicationName: "KB Admin Panel",
  authors: [{ name: "Khan Brothers Engineering & Solutions" }],
  generator: "Next.js",
  referrer: "strict-origin-when-cross-origin",
  // IMPORTANT: Prevent search engines from indexing admin panel
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": 0,
      "max-image-preview": "none",
      "max-snippet": 0,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  // Security headers hint
  other: {
    "msapplication-TileColor": "#1E40AF",
    "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Prevent indexing */}
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <ApolloClientProviderComponent>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ApolloClientProviderComponent>
      </body>
    </html>
  );
}
