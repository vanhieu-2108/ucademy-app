import type { Metadata } from "next";
import "./globals.scss";
import { manrope } from "@/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/src/sweetalert2.scss";
export const metadata: Metadata = {
  title: "Ucademy",
  description: "Nền tảng học lập trình siêu cấp pro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={manrope.className}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <NextTopLoader height={4} showSpinner={false} color="#050C9C" />
            {children}
            <ToastContainer
              autoClose={2000}
              bodyClassName="text-sm font-medium"
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
