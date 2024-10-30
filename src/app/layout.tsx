import "@/app/globals.css";

// COMPONENTS
import ReactQueryProvider from '@/components/ReactQueryProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body>
          <main className="app-layout">
            {children}
          </main>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
