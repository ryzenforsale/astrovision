import './globals.css';
import { Cinzel, Quicksand } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '700'] });
const quicksand = Quicksand({ subsets: ['latin'], weight: ['300', '400', '600'] });

export const metadata = {
  title: 'Astro Vision | Discover Your Destiny',
  description: 'Palm reading and future astrology insights.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <main className="app-container">
          {children}
        </main>
      </body>
    </html>
  );
}