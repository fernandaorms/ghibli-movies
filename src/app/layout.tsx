import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes'

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
        <html lang='en' suppressHydrationWarning>
            <body className={`${rubik.variable} antialiased`}>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
