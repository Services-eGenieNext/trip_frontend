import './globals.css'
import Header from '@/components/Header/header'
import Footer from '@/components/Footer/footer'
import type { Metadata } from 'next'
import Head from 'next/head'

export const metadata: Metadata = {
  title: 'WePlan - Trip',
  description: 'WePlan provide best trip plans for tourists',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  )
}
