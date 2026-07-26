import type { Metadata } from "next";
import { inter, montserrat, poppins } from "@/theme";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";


export const metadata: Metadata = {
  title: "OppurtunityHub_NG",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html
        lang="en"
        className={`${inter.variable} ${montserrat.variable} ${poppins.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </QueryProvider>
  );
}
