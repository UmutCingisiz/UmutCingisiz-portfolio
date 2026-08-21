import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto max-w-4xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
        {children}
      </div>
      <SiteFooter />
    </>
  );
}
