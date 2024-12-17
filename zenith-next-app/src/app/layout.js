"use client"
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/Aside/index";
import { Button } from "@/components/Button";
import { Header } from '@/components/Header';
import { UserProvider } from "@/context/AuthContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "Zenith",
//   description: "Sua plataforma preferida para gerenciamento de riscos de projetos",
// };

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Envolvendo a aplicação com o TranslationProvider e UserProvider */}

        <DndProvider backend={HTML5Backend}>
        <UserProvider>
          {children}
        </UserProvider>
        </DndProvider>

      </body>
    </html>
  )
}

const Layout = ({ children }) => {
  return (
    <>
      <AppSidebar />
      <main className="hidden">
        <SidebarTrigger />
        {children}
      </main>
    </>
  );
}
