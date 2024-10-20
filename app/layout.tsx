import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Analytics } from "@vercel/analytics/react";

const inter = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevLinks",
  description: "Get you started sharing your links!",
  icons: "/devlink-icon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: inter.style.fontFamily,
              colorBorder: "transparent",
              colorBorderSecondary: "transparent",
              colorPrimaryBorderHover: "transparent",
            },
          }}
        >
          <AntdRegistry>{children}</AntdRegistry>
          <Analytics />
        </ConfigProvider>
      </body>
    </html>
  );
}
