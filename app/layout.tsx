
import "./globals.css";
import { Hind_Siliguri } from 'next/font/google';
 
const displayFont = Hind_Siliguri({
    fallback: ['serif'],
    weight: ['400', '500', '600', '700']
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={displayFont.className}>
        <head>
            <title>রোকেয়া কীবোর্ড লে-আউট || Rokeya Keyboard Layout</title>
            <meta name="description" content="রোকেয়া কীবোর্ড লে-আউট || A phonetic Bangla keyboard layout designed for efficient typing and ease of use, inspired by the legacy of Rokeya Sakhawat Habib." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
             {/* Favicon */}
            <link rel="icon" href="Orange-squares-01.svg" />
        </head>
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        {children}
      </body>
    </html>
  )
}
