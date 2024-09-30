"use client";
import { usePathname } from 'next/navigation';
import Footer from '@/component/Footer/Footer';
import '../app/globals.css';
import Navbar from '@/component/Navbar/Navbar';
import Navbar2 from '@/component/Navbar2/Navbar';
import Navbar3 from '@/component/Navbar3/Navbar';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <>
          <Navbar />
          {pathname !== '/profile' && (
            <>
              <Navbar2 />
              <Navbar3 />
            </>
          )}
        </>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
