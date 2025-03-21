import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import './globals.css';
import ScrollToTop from "@/components/ui/ScrollToTop";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Social App",
    description: "Social app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`} >
                {children}
                <ScrollToTop />
            </body>
        </html>
    );
}
