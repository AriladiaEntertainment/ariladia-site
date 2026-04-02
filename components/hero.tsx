"use client"

import { useEffect, useState } from "react"

const DEADLINE = new Date("April 30, 2026 23:59:59").getTime()

function pad(n: number) {
  return String(n).padStart(2, "0")
}

export function Hero() {
  const [time, setTime] = useState({ days: "00", hours: "00", mins: "00", secs: "00" })

  useEffect(() => {
    function tick() {
      const now = Date.now()
      const t = Math.max(DEADLINE - now, 0)
      setTime({
        days: pad(Math.floor(t / (1000 * 60 * 60 * 24))),
        hours: pad(Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        mins: pad(Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))),
        secs: pad(Math.floor((t % (1000 * 60)) / 1000)),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#050505]/80 pointer-events-none" />

      {/* Blue ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,200,255,0.10) 0%, transparent 65%)" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 180px 80px rgba(0,0,0,0.7)" }} />

      <div className="z-20 text-center px-6 flex flex-col items-center gap-4">
        <p className="text-[11px] font-bold tracking-[0.6em] uppercase text-cyan-400 mb-1">
          Ariladia Entertainment Presents
        </p>

        {/* Title Graphic */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whisk_49bd0b7f6c7322e8acf41a1588586980eg-4GZEfoDDxkkWv3VBf9h5JC73z2WO0W.png"
          alt="Ariladia Presents The Scoring Initiative"
          className="w-full max-w-3xl lg:max-w-5xl h-auto drop-shadow-[0_0_40px_rgba(0,200,255,0.3)]"
        />

        <p className="text-sm sm:text-base text-cyan-300/80 font-semibold tracking-[0.4em] uppercase mt-4">
          The Lottery Begins
        </p>

        {/* Glass Panel Countdown */}
        <div className="mt-8 inline-flex items-center border border-cyan-400/25 bg-black/40 backdrop-blur-2xl rounded-2xl px-6 sm:px-12 py-5 shadow-[0_0_40px_rgba(0,200,255,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]">
          {[
            { value: time.days, label: "Days" },
            { value: time.hours, label: "Hrs" },
            { value: time.mins, label: "Min" },
            { value: time.secs, label: "Sec" },
          ].map((unit, i) => (
            <div key={unit.label} className="flex items-center">
              <div className="text-center w-14 sm:w-20">
                <span
                  className="block text-3xl sm:text-5xl font-black tabular-nums text-white"
                  style={{ textShadow: "0 0 24px rgba(0,200,255,0.5)" }}
                >
                  {unit.value}
                </span>
                <span className="text-[9px] sm:text-[11px] uppercase text-cyan-400/60 tracking-[0.3em] font-semibold">
                  {unit.label}
                </span>
              </div>
              {i < 3 && (
                <span className="text-2xl sm:text-3xl font-black text-cyan-400/30 pb-4 mx-1 sm:mx-2">
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        <a
          href="#submit"
          className="mt-8 bg-cyan-400 text-[#050505] font-black text-sm px-12 py-4 rounded-full hover:bg-white transition-all duration-300 uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(0,200,255,0.4)] hover:shadow-[0_0_60px_rgba(0,200,255,0.6)]"
        >
          Enter the Lottery
        </a>
      </div>
    </header>
  )
}
