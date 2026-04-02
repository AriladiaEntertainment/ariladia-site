import type { Metadata } from 'next'
import { Barlow_Condensed, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
});
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ARILADIA | The REFORCEMENT Initiative',
  description: 'A random lottery offering independent creators a custom high-fidelity score for their visual narrative. Submit your short film, game, doc, or show for $5.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${barlowCondensed.variable} font-sans antialiased`}>
        {/* Fixed full-page comic panel background */}
        <div className="fixed inset-0 -z-10 flex flex-col">
          {/* Top 2x2 grid */}
          <div className="flex-1 grid grid-cols-2">
            {[
              { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whisk_2yzylfwy4ywy1qzntidnyewlmvmn00sy0emytyt-70dyUe6afct3LNy2D1wcWSaTvCGiJS.png", alt: "Masked tech hero", pos: "object-[50%_20%]" },
              { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whisk_1mgzzedzxktmknwztijy5gtlzgtn00yy2uwntcz-behuSqNzNbVjFGXtKR2u2baMfygYGx.png", alt: "Cosmic titan", pos: "object-[50%_30%]" },
              { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whisk_2yjzkvwz4ijywqgmtuwm0iwlxujn00izwmmztiw-IpTQTVN59c64QXMj8Mo4JZb7WP1wkI.png", alt: "Fire hero levitating", pos: "object-[50%_20%]" },
              { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whisk_knto1mzyjhdomfwmtmwnlfwlinzm00co0kzntem-cXo0XDSpXtHkzREAYbsCfkTK1ylkri.jpeg", alt: "Fire and tech hero duo", pos: "object-[50%_30%]" },
            ].map((img) => (
              <div key={img.alt} className="relative overflow-hidden">
                <img src={img.src} alt="" aria-hidden="true" className={`w-full h-full object-cover ${img.pos}`} style={{ filter: "saturate(0.85) brightness(0.6)" }} />
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,200,255,0.8) 1px, transparent 1px)", backgroundSize: "6px 6px" }} />
              </div>
            ))}
          </div>
          {/* Bottom row - 4 images */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4">
            {[
              { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whisk_4udmlfznlzgo0u2mtktzzgtllfto00izkvdztiw-wwltHSRCLqaFRDBlsK1DQc5tydgSoa.png", alt: "Electric hands hero", pos: "object-[50%_30%]" },
              { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whisk_hrzyyegn1itzwiwztcdm4ewlkrjm00cmwejmtyw-9dTBIEWCcM2ATNLvm99C0MJGM72EY0.png", alt: "Fire golden hero", pos: "object-[50%_30%]" },
              { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whisk_3ytmkrtm3ujz5ugztidnxiwlldzy00soiddntkz-LXs8HNzGMWj3VVb25GOQZbNX41sl0M.png", alt: "Team room", pos: "object-[50%_40%]" },
              { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whisk_zmmyirjmihtnyigztytm5gtl5yzy00iz0gdmtkd-Uj9MtB5RKh6XMgGfH2DbP1Sty4sjCC.png", alt: "Cosmic titan solo", pos: "object-[50%_30%]" },
            ].map((img) => (
              <div key={img.alt} className="relative overflow-hidden">
                <img src={img.src} alt="" aria-hidden="true" className={`w-full h-full object-cover ${img.pos}`} style={{ filter: "saturate(0.85) brightness(0.6)" }} />
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,200,255,0.8) 1px, transparent 1px)", backgroundSize: "6px 6px" }} />
              </div>
            ))}
          </div>
          {/* Panel gutters */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 bottom-0 left-1/2 w-[3px] -translate-x-px bg-[#050505]" />
            <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-px bg-[#050505]" />
          </div>
          {/* Global dark overlay - lighter for brighter feel */}
          <div className="absolute inset-0 bg-[#050505]/40 pointer-events-none" />
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
