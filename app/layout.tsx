import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toast";
import Providers from "@/components/common/Providers";

export const metadata: Metadata = {
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "Shubham Meshram", "Pune"],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="noise-bg antialiased" suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: "hsl(0 0% 7%)",
                border: "1px solid hsl(0 0% 15%)",
                color: "hsl(0 0% 95%)",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
