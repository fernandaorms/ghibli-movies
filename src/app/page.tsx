'use client';

import { Header } from '@/layout/header';
import { About } from '@/layout/home/about';
import { Start } from '@/layout/home/start';
import { Tech } from '@/layout/home/tech';
import { Hero } from '@/layout/home/hero';
import { Footer } from '@/layout/footer';

export default function Home() {
    return (
        <div>
            <Header />

            <main>
                <Hero />

                <About />

                <Start />

                <Tech />
            </main>

            <Footer />
        </div>
    );
}
