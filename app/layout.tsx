import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Vishal Jha - Full Stack Developer & Data Analyst | Portfolio",
  description:
    "Passionate Full Stack Developer & Data Analyst from New Delhi, specializing in AI-driven web applications, data visualization, and modern web technologies. View my projects and get in touch!",
  keywords: [
    "Full Stack Developer",
    "Data Analyst",
    "Python",
    "JavaScript",
    "React",
    "Next.js",
    "Portfolio",
    "Web Developer",
    "New Delhi",
    "AI",
    "Machine Learning",
  ],
  authors: [{ name: "Vishal Jha" }],
  creator: "Vishal Jha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vishaljha.dev",
    title: "Vishal Jha - Full Stack Developer & Data Analyst",
    description:
      "Passionate Full Stack Developer & Data Analyst specializing in AI-driven web applications and data visualization.",
    siteName: "Vishal Jha Portfolio",
    images: [
      {
        url: "/vishal-photo.png",
        width: 1200,
        height: 630,
        alt: "Vishal Jha - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishal Jha - Full Stack Developer & Data Analyst",
    description:
      "Passionate Full Stack Developer & Data Analyst specializing in AI-driven web applications and data visualization.",
    images: ["/vishal-photo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <link rel="canonical" href="https://vishaljha.dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${spaceGrotesk.className} antialiased`}>{children}</body>
    </html>
  )
}
