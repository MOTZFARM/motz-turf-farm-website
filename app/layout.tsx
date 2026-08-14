import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "motzfarm.com";
  const protocol = host.includes("localhost") ? "http" : "https";
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Motz Turf Farms | Cincinnati Sod & Turf Experts",
    description: "Family-owned for over 60 years. Natural sod, synthetic turf installation and professional seeding across Greater Cincinnati.",
    openGraph: {
      title: "Motz Turf Farms | Great lawns start here.",
      description: "Natural sod, synthetic turf and seeding from Cincinnati's trusted turf team.",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Motz Turf Farms — Great lawns start here." }],
    },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
