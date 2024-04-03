"use client";

import { Inter } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import CustomerNavbar from "./components/CustomerNavbar";
import Footer from "./components/Footer";

import UserProvider from "./context/UserProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ToastContainer />
          <CustomerNavbar />
          <div className="mt-2">{children}</div>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
