import { Inter } from "next/font/google";
import "./globals.css";
import { DarkThemeProvider } from "./utilites/DarkThemeProvider";
import Header from "./component/Header";
import NextTopLoader from "nextjs-toploader";
import CustomProviders from "@/StoreConfiguration/CustomProviders";



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
        <CustomProviders>
        <>
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
        //     template='<div className="bar" role="bar"><div className="peg"></div></div> 
        // <div className="spinner" role="spinner"><div className="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          {/* Initialize Tailwind with CDN and plugins */}
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries"></script>
          {children}
        </DarkThemeProvider>
        </>
        </CustomProviders>
        
        {/* </main> */}
      </body>
    </html>
  );
}
