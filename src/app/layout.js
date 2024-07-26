import { Inter } from "next/font/google";
import "./globals.css";
import { DarkThemeProvider } from "./utilites/DarkThemeProvider";
import Header from "./component/Header";
import NextTopLoader from "nextjs-toploader";

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
      <NextTopLoader
        color="#2299DD"
        initialPosition={0.08}
        crawlSpeed={200}
        height={4}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        template='<div class="bar" role="bar"><div class="peg"></div></div> 
        <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
        />
      {/* <Header/> */}
          {children}
      </DarkThemeProvider>
      {/* </main> */}
      </body>
    </html>
  );
}
