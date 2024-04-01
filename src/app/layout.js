import { Inter } from "next/font/google";
import "./globals.css";
import { DarkThemeProvider } from "./utilites/DarkThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "spurtCMS Blog Template-3",
  description: "spurtCMS Blog Template-3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {/* <main className="container min-h-screen mx-auto max-w-screen-lg"> */}
      <DarkThemeProvider>
          {children}
      </DarkThemeProvider>
      {/* </main> */}
      </body>
    </html>
  );
}
