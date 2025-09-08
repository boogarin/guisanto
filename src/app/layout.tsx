import { Geist } from "next/font/google";
import "./globals.css";
import ClientProviders from "./providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata = {
  title: "Guilherme Galvão",
  description: "Fullstack Dev - Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('darkMode');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = stored !== null ? stored === 'true' : prefersDark;
                  document.documentElement.classList.toggle('dark', isDark);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} antialiased cursor-none
      bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] bg-[size:15px_15px]
      dark:bg-[#1c1c1e] dark:bg-[radial-gradient(circle,#73737340_1px,transparent_1px)]`}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
