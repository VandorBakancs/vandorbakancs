import './globals.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body className="antialiased">
        <div className="flex min-h-screen bg-[#f0fdf4]">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}