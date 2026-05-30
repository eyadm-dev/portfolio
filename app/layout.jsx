import "./globals.css";
import LayoutClient from "./LayoutClient";

export const metadata = {
  title: "EYAD Mohamed | Portfolio",
  description: "Frontend Developer & UI/UX Designer based in Benisuef, Egypt. Specialized in React, Next.js, and modern web technologies.",
  keywords: "Frontend Developer, UI/UX Designer, React, Next.js, Portfolio, Web Development",
  authors: [{ name: "EYAD Mohamed" }],
  openGraph: {
    title: "EYAD Mohamed | Frontend Developer Portfolio",
    description: "Frontend Developer & UI/UX Designer based in Benisuef, Egypt.",
    url: "https://your-portfolio.com",
    siteName: "EYAD Portfolio",
    images: [
      {
        url: "/imgs/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}