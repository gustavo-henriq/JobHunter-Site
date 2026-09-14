import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://jobhunter-gustavoh.gustavo-hs369.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JobHunter — Vagas certas, antes do ruído",
  description:
    "Pipeline inteligente e modular que encontra, filtra e prioriza oportunidades para qualquer perfil profissional.",
  openGraph: {
    title: "JobHunter — Vagas certas, antes do ruído",
    description:
      "Descoberta inteligente de oportunidades, adaptada ao seu perfil e objetivo profissional.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JobHunter — Vagas certas, antes do ruído",
    description:
      "Descoberta inteligente de oportunidades, adaptada ao seu perfil e objetivo profissional.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/job-hunter-encaixe.png", type: "image/png", sizes: "128x128" }],
    shortcut: "/job-hunter-encaixe.png",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
