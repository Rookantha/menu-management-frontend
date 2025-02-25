import type { Metadata } from "next";
import { Providers } from "@/redux/Providers";
import Link from "next/link"; // Import Link
import "./globals.css";

export const metadata: Metadata = {
  title: "Menu Management App",
  description: "Manage hierarchical menus in Next.js 14",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-6">
              <h2 className="text-xl font-bold mb-4">Sidebar</h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="block p-2 hover:bg-gray-700 rounded">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/menus" className="block p-2 hover:bg-gray-700 rounded">
                    Menus
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="block p-2 hover:bg-gray-700 rounded">
                    Settings
                  </Link>
                </li>
              </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
