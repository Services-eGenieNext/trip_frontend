import './globals.css'
import Header from '@/components/Header/header'
import Footer from '@/components/Footer/footer'
import type { Metadata } from 'next'
import { Providers } from '@/redux/provider'

export const metadata: Metadata = {
  title: 'WePlan - Trip',
  description: 'WePlan provide best trip plans for tourists',
}

function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Header />
                        {children}
                    <Footer/>
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout;