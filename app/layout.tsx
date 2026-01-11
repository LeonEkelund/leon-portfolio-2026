import type { Metadata } from "next";
import "./globals.css";
import { NavigationDock } from "@/components/navigation-dock"
import { Albert_Sans } from "next/font/google"
import { Background } from "@/components/background"
import { LenisProvider } from "@/components/lenis-provider"
import { LoadingProvider } from "@/components/loading-context"
import { LightboxProvider } from "@/components/lightbox-context"
import Script from "next/script"

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})




export const metadata: Metadata = {
  title: "Leon Ekelund Portfolio",
  description: "Stockholm-based front-end developer with a passion for creative, interactive web experiences. Available for new opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="4d029f88-1ca5-413f-a642-6fd3cf8f32e9"
        strategy="lazyOnload"
      />
      <body className={`${albertSans.variable}`}>
        <LoadingProvider>
          <LightboxProvider>
            <LenisProvider>
              <Background />
              {children}
              <NavigationDock />
            </LenisProvider>
          </LightboxProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
