import type { Metadata } from "next";
import SideBar from "@/components/ui/SideBar";

import './globals.admin.css';
import Link from "next/link";
import { FaEye } from "react-icons/fa6";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen max-w-screen-2xl mx-auto">
        <div className="relative">
          <aside className="fixed w-[260px]">
            <SideBar />
          </aside>
          <main className="ml-[260px]">
            <header className="flex items-center justify-end h-16 bg-gray-700">
              <div className="mx-2">
                <Link href='/' className="py-2 px-4 bg-blue-900 flex items-center gap-2 rounded text-xs hover:bg-blue-800"><FaEye />HomePage</Link>
              </div>
            </header>
            <section className="m-9">
              <Suspense fallback={<div className="text-center">loading...</div>}>
                {children}
              </Suspense>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
