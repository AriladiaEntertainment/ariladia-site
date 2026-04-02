"use client"

export function Nav() {
  return (
    <nav className="fixed w-full z-50 px-6 py-4 flex justify-between items-center bg-[#050505]/60 backdrop-blur-xl border-b border-white/[0.08]">
      <a
        href="https://www.ariladia.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group"
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whisk_azm0cjz4udz2imn00syyumytqtm4qtlzewzk1iz-lHLkfaXd9usyL84TaJCa1PNTm8e51A.png"
          alt="Ariladia Entertainment LLC"
          className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
          style={{ filter: "drop-shadow(0 0 10px rgba(0,200,255,0.3))" }}
        />
      </a>
      <div className="flex items-center gap-4">
        <a
          href="https://www.ariladia.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-slate-300 hover:text-cyan-400 font-semibold uppercase tracking-[0.2em] transition-colors hidden sm:block"
        >
          About Us
        </a>
        <a
          href="#submit"
          className="bg-cyan-400 text-[#050505] text-[11px] font-bold px-6 py-2.5 rounded-full hover:bg-white transition-colors uppercase tracking-[0.15em] shadow-[0_0_20px_rgba(0,200,255,0.25)]"
        >
          Submit Now
        </a>
      </div>
    </nav>
  )
}
