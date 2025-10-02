import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rhode Island Fishing Guide",
  description: "Advanced AI-powered fishing assistant for Rhode Island waters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}