import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare, GeistPixelGrid } from "geist/font/pixel";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { ClientShell } from "@/components/ClientShell";

export const metadata: Metadata = {
  title: "We Are The Pixels — Creative Technology Studio",
  description:
    "A cinematic technology studio building products, systems, and experiences at the intersection of design and engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        GeistSans.variable,
        GeistMono.variable,
        GeistPixelSquare.variable,
        GeistPixelGrid.variable,
      )}
    >
      <body className="min-h-full flex flex-col grain">
        <SmoothScrollProvider>
          <ClientShell />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
