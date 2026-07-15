import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "نظام إدارة الموظفين — M2INFINITY",
  description: "نظام إدارة الموظفين الخاص بشركة M2INFINITY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}