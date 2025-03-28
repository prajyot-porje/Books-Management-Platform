import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "600"
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic"],
})


export const metadata: Metadata = {
  title: "Library Platform",
  description: "A platform to manage library books and users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Add any custom meta tags or links here */}
        </head>
        <body
          className={` ${poppins.className}  antialiased`}
          data-theme="light"
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
