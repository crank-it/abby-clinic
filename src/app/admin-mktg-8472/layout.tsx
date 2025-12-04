import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin - Marketing Integrations",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAuthenticated();

  // Don't redirect if we're on the sign-in page
  const isSignInPage = false; // Layout can't know the current path easily

  if (!authenticated) {
    // We'll handle this in the page component instead
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
