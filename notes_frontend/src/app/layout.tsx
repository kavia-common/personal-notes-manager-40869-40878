import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ocean Notes",
  description: "Personal notes manager with a modern Ocean Professional theme.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ background: "var(--op-background)" }}>
        {children}
      </body>
    </html>
  );
}
