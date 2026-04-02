"use client"

import { useActionState, useState } from "react"
import { submitEntry, type SubmitEntryState } from "@/app/actions/submit-entry"

const initialState: SubmitEntryState = { success: false }

export function SubmitForm() {
  const [state, formAction, isPending] = useActionState(submitEntry, initialState)
  const [transactionId, setTransactionId] = useState("")

  const isValidTransactionId = transactionId.trim().length > 0

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
              <div className="flex justify-center items-center gap-8 mb-4 flex-wrap">
                <div className="bg-white p-3 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <img
                    src="/images/paypal-qr.png"
                    alt="Ariladia REFORCEMENT Scoring Initiative - PayPal QR Code"
                    width={180}
                    height={180}
                    className="block"
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <a
                    href="https://www.paypal.com/ncp/payment/4ZCXGAS75CST6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-400 text-black font-bold px-8 py-2.5 rounded hover:bg-yellow-300 transition-colors text-sm"
                  >
                    Buy Now
                  </a>
                  <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="Accepted payment methods" className="h-6" />
                  <div className="text-[0.625rem] text-slate-500">
                    Powered by{' '}
                    <img
                      src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg"
                      alt="PayPal"
                      className="h-3 inline align-middle"
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center mb-4">
                Scan to support the Ariladia REFORCEMENT Scoring Initiative
              </p>

              {/* Transaction ID input */}
              <div className="mt-6">
                <label htmlFor="transactionId" className="sr-only">
                  PayPal Transaction ID
                </label>
                <input
                  id="transactionId"
                  name="transactionId"
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="ENTER PAYPAL TRANSACTION ID"
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:border-cyan-400 outline-none text-sm text-slate-100 placeholder:text-slate-500 font-semibold tracking-widest transition-colors"
                />
                {transactionId && (
                  <p className="text-xs text-cyan-400 mt-2 flex items-center gap-2">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Transaction ID confirmed
                  </p>
                )}
              </div>

              {/* Hidden field to pass transaction ID to server action */}
              <input type="hidden" name="transactionId" value={transactionId} />
            </div>

            <button
              type="submit"
              disabled={isPending || !isValidTransactionId}
              className="w-full bg-cyan-400 text-[#050505] font-black py-5 rounded-full hover:bg-white transition-all duration-300 uppercase tracking-[0.2em] text-sm disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_40px_rgba(0,200,255,0.3)] hover:shadow-[0_0_60px_rgba(0,200,255,0.5)]"
            >
              {isPending ? "Submitting..." : !isValidTransactionId ? "Enter Transaction ID to Submit" : "Submit Entry"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
