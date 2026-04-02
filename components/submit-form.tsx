"use client"

import { useActionState, useState } from "react"
import { submitEntry, type SubmitEntryState } from "@/app/actions/submit-entry"

const initialState: SubmitEntryState = { success: false }

export function SubmitForm() {
  const [state, formAction, isPending] = useActionState(submitEntry, initialState)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  return (
    <section
      id="submit"
      className="py-24 px-6 relative"
      aria-labelledby="submit-heading"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0, 200, 255, 0.05) 0%, transparent 60%)",
        }}
      />

      {/* Glass Panel Form */}
      <div className="max-w-xl mx-auto bg-black/50 backdrop-blur-2xl rounded-3xl border border-cyan-400/15 p-10 relative z-10 shadow-[0_0_80px_rgba(0,200,255,0.08),inset_0_1px_0_rgba(255,255,255,0.05)]">
        <p className="text-[11px] font-bold tracking-[0.55em] uppercase text-cyan-400 mb-2 text-center">
          $5 Entry
        </p>
        <h2
          id="submit-heading"
          className="text-3xl font-black mb-8 text-center uppercase tracking-[0.12em] text-white"
          style={{ textShadow: "0 0 30px rgba(0,200,255,0.2)" }}
        >
          Submit Your Project
        </h2>

        {state.success ? (
          <div className="text-center py-8">
            <p
              className="text-4xl font-black uppercase tracking-[-0.02em] text-white mb-3"
              style={{ textShadow: "0 0 30px rgba(0, 200, 255, 0.5)" }}
            >
              You&apos;re In.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your submission has been received. Drawing takes place April 30,
              2026 — we&apos;ll be in touch.
            </p>
          </div>
        ) : (
          <form action={formAction} className="space-y-5">
            {state.error && (
              <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg">{state.error}</p>
            )}

            <div>
              <label htmlFor="name" className="sr-only">
                Full Name or Studio
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="FULL NAME / STUDIO"
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-cyan-400 outline-none text-sm text-slate-100 placeholder:text-slate-500 font-semibold tracking-widest transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="EMAIL"
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-cyan-400 outline-none text-sm text-slate-100 placeholder:text-slate-500 font-semibold tracking-widest transition-colors"
              />
            </div>

            <div>
              <label htmlFor="projectTitle" className="sr-only">
                Project Title
              </label>
              <input
                id="projectTitle"
                name="projectTitle"
                type="text"
                required
                placeholder="PROJECT TITLE"
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-cyan-400 outline-none text-sm text-slate-100 placeholder:text-slate-500 font-semibold tracking-widest transition-colors"
              />
            </div>

            <div>
              <label htmlFor="category" className="sr-only">
                Project Category
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue=""
                className="w-full bg-black/60 border-b border-white/10 py-3 focus:border-cyan-400 outline-none text-sm text-slate-500 font-semibold tracking-widest transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  PROJECT CATEGORY
                </option>
                <option value="film" className="text-white bg-[#0a0a0a]">
                  SHORT FILM
                </option>
                <option value="game" className="text-white bg-[#0a0a0a]">
                  VIDEO GAME
                </option>
                <option value="doc" className="text-white bg-[#0a0a0a]">
                  DOCUMENTARY
                </option>
                <option value="show" className="text-white bg-[#0a0a0a]">
                  SHOW PILOT / SERIES
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="footage" className="sr-only">
                Link to footage
              </label>
              <input
                id="footage"
                name="footage"
                type="url"
                required
                placeholder="LINK TO FOOTAGE (VIMEO / DRIVE)"
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-cyan-400 outline-none text-sm text-slate-100 placeholder:text-slate-500 font-semibold tracking-widest transition-colors"
              />
            </div>

            <div>
              <label htmlFor="vibe" className="sr-only">
                Describe the vibe / story
              </label>
              <textarea
                id="vibe"
                name="vibe"
                rows={3}
                placeholder="DESCRIBE THE VIBE / STORY"
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-cyan-400 outline-none text-sm text-slate-100 placeholder:text-slate-500 font-semibold tracking-widest resize-none transition-colors"
              />
            </div>

            {/* PayPal Payment Section */}
            <div className="border-t border-white/5 pt-6 mt-6">
              <p className="text-[11px] text-slate-400 text-center mb-4 uppercase tracking-[0.35em] font-semibold">
                Pay $5 via PayPal, then submit
              </p>
              <div className="flex justify-center mb-4">
                <div className="bg-white p-3 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <img
                    src="/images/paypal-qr.png"
                    alt="Ariladia REFORCEMENT Scoring Initiative - PayPal QR Code"
                    width={180}
                    height={180}
                    className="block"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center mb-4">
                Scan to support the Ariladia REFORCEMENT Scoring Initiative
              </p>

              {/* Payment confirmation checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group mt-2">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={paymentConfirmed}
                    onChange={(e) => setPaymentConfirmed(e.target.checked)}
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      paymentConfirmed
                        ? "bg-cyan-400 border-cyan-400"
                        : "bg-transparent border-white/20 group-hover:border-cyan-400/50"
                    }`}
                  >
                    {paymentConfirmed && (
                      <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-xs text-slate-400 leading-relaxed font-semibold tracking-wide">
                  I have completed my $5 PayPal payment
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending || !paymentConfirmed}
              className="w-full bg-cyan-400 text-[#050505] font-black py-5 rounded-full hover:bg-white transition-all duration-300 uppercase tracking-[0.2em] text-sm disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_40px_rgba(0,200,255,0.3)] hover:shadow-[0_0_60px_rgba(0,200,255,0.5)]"
            >
              {isPending ? "Submitting..." : !paymentConfirmed ? "Complete Payment to Submit" : "Submit Entry"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
