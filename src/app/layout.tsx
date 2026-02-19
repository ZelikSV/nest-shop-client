import type { Metadata } from 'next';
import { QueryProvider } from '@/providers/QueryProvider';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/components/ui/Toast/Toast';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'NestShop',
  description: 'Online shop built with Next.js and NestJS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            <CartProvider>
              <ToastProvider>
                <Header />
                <main>{children}</main>
                <Footer />
              </ToastProvider>
            </CartProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
