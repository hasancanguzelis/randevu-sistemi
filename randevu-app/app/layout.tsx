import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "İmaj Erkek Kuaför",
  description: "Online randevu ile sıra beklemeden hizmet alın.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
