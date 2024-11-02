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
        <body
          className="app-layout"
        >
          <header
            className=""
          >
            <nav
              className="flex p-4 bg-secondary justify-around"
            >
              <button
                className="font-bold text-heading text-xl hover:bg-primary hover:text-heading-invert transition-colors duration-200 ease-out px-4 py-2 rounded-md"

              >
                My Tasks
              </button>
              <span className="w-[1px] bg-body py-4" />
              <button
                className="font-bold text-heading text-xl hover:bg-primary hover:text-heading-invert transition-colors duration-200 ease-out px-4 py-2 rounded-md"

              >
                Users
              </button>
              <span className="w-[1px] bg-body py-4" />
              <button
                className="font-bold text-heading text-xl hover:bg-primary hover:text-heading-invert transition-colors duration-200 ease-out px-4 py-2 rounded-md"

              >
                About
              </button>
              <span className="w-[1px] bg-body py-4" />
              <button
                className="font-bold text-heading text-xl bg-red-400 hover:bg-red-600 hover:text-heading-invert transition-colors duration-200 ease-out px-4 py-2 rounded-md"
              >
                Sign out
              </button>
            </nav>

          </header>
          <main className="">
            {children}
          </main>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
