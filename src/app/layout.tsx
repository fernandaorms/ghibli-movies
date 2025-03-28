import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import './globals.css';

const rubik = Rubik({
    variable: '--font-rubik',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Ghibli Movies',
    description: 'Studios Ghibli movies cathalog',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className='scroll-smooth' suppressHydrationWarning>
            <body className={`${rubik.variable} antialiased`}>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
