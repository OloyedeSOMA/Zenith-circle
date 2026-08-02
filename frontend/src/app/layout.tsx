import type { Metadata } from "next";
import { inter, montserrat, poppins } from "@/theme";
import Script from "next/script";

import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;

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
    
      <html
        lang="en"
        className={`${inter.variable} ${montserrat.variable} ${poppins.variable} h-full antialiased`}
      >
        <body className="min-h-full">
          <QueryProvider>{children}</QueryProvider>
        
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />

          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];

              function gtag(){
                dataLayer.push(arguments);
              }

              window.gtag = gtag;

              gtag('js', new Date());

              gtag('config', '${GA_ID}');
            `}
          </Script>
      </body>
      </html>
  );
}
