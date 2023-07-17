import Hero from '@/components/Hero/hero'
import Products from '@/components/Products/Products'
import Image from 'next/image'

export default function Home() {
    return (
        <main>
            <Hero />

            <Products />
        </main>
    )
}
