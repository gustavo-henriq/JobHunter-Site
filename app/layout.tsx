import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jobhunter-site.pages.dev"),
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
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
