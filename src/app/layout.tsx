import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Added Outfit for headings
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "ValuTAS - Premium Property Insights",
  description: "Discover the true value of Hobart real estate with AI-powered valuations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Default to dark for "wow" factor
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col bg-gradient-mesh bg-cover bg-fixed">
            {/* Gradient Overlay for extra finish */}
            <div className="fixed inset-0 bg-background/30 backdrop-blur-[1px] -z-10 pointer-events-none" />

            <Header />
            <main className="flex-1 pt-28 pb-12 px-4 container mx-auto relative z-10">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
