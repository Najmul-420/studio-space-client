import '@/app/globals.css';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'StudioSpace — Creative Workspace Platform',
  description: 'Book studio spaces for photography, film, podcast, and music production.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster position="top-right" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}