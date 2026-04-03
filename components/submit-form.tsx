"use client"

import { useState } from "react"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzvbvqr" // updated

interface FormData {
  name: string
  email: string
  projectTitle: string
  category: string
  footage: string
  vibe: string
}

type Step = "form" | "pay" | "confirm" | "done"

const categoryLabels: Record<string, string> = {
  film: "Short Film",
  game: "Video Game",
  doc: "Documentary",
  show: "Show Pilot / Series",
}

export function SubmitForm() {
  const [step, setStep] = useState<Step>("form")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    projectTitle: "",
    category: "",
    footage: "",
    vibe: "",
  })
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.projectTitle.trim() !== "" &&
    formData.category !== "" &&
    formData.footage.trim() !== ""

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleContinueToPayment = () => {
    if (!isFormValid) {
      setError("Please fill in all required fields.")
      return
    }
    setStep("pay")
  }

  const handleIHavePaid = () => {
    setStep("confirm")
  }

  const handleSubmit = async () => {
    if (!paymentConfirmed) {
      setError("Please confirm you have completed payment.")
      return
    }
    setIsSubmitting(true)
    setError("")
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectTitle: formData.projectTitle,
          category: categoryLabels[formData.category] || formData.category,
          footageLink: formData.footage,
          description: formData.vibe || "Not provided",
          paymentConfirmed: true,
          submittedAt: new Date().toISOString(),
        }),
      })
      if (!response.ok) {
        setError("Submission failed. Please try again.")
      } else {
        setStep("done")
      }
    } catch {
      setError("Submission failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="submit" className="py-24 px-6 relative" aria-labelledby="submit-heading">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(0, 200, 255, 0.05) 0%, transparent 60%)" }}
      />

      <div className="max-w-xl mx-auto bg-black/50 backdrop-blur-2xl rounded-3xl border border-cyan-400/15 p-10 relative z-10 shadow-[0_0_80px_rgba(0,200,255,0.08),inset_0_1px_0_rgba(255,255,255,0.05)]">
        <p className="text-[11px] font-bold tracking-[0.55em] uppercase text-cyan-400 mb-2 text-center">
          $5 Entry
        </p>
        <h2
          id="submit-heading"
          className="text-3xl font-black mb-4 text-center uppercase tracking-[0.12em] text-white"
          style={{ textShadow: "0 0 30px rgba(0,200,255,0.2)" }}
        >
          Submit Your Project
        </h2>

        <div className="bg-gradient-to-r from-cyan-400/10 to-cyan-400/5 border border-cyan-400/30 rounded-lg p-4 mb-8 text-center">
          <p className="text-xs text-cyan-300 uppercase tracking-widest font-semibold mb-1">Submission Deadline</p>
          <p className="text-lg font-black text-cyan-400">April 30, 2026</p>
          <p className="text-xs text-slate-400 mt-1">Drawing Date: May 3, 2026</p>
        </div>

        {/* Step indicators */}
        {step !== "done" && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {(["form", "pay", "confirm"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-colors ${
                  step === s ? "bg-cyan-400 text-black" :
                  (step === "pay" && s === "form") || (step === "confirm" && s !== "confirm") || (step === "done")
                    ? "bg-cyan-400/30 text-cyan-400" : "bg-white/10 text-slate-500"
                }`}>
                  {i + 1}
                </div>
                {i < 2 && <div className="w-8 h-px bg-white/10" />}
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Project Details */}
        {step === "form" && (
          <div className="space-y-5">
            {error && (
              <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg">{error}</p>
            )}
            <div>
              <label htmlFor="name" className="sr-only">Full Name or Studio</label>
              <input
                id="name" name="name" type="text" required
                value={formData.name} onChange={handleInputChange}
                placeholder="FULL NAME / STUDIO"
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-cyan-400 outline-none text-sm text-slate-100 placeholder:text-slate-500 font-semibold tracking-widest transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email" name="email" type="email" required
                value={formData.email} onChange={handleInputChange}
                placeholder="EMAIL"
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-cyan-400 outline-none text-sm text-slate-100 placeholder:text-slate-500 font-semibold tracking-widest transition-colors"
              />
            </div>
            <div>
              <label htmlFor="projectTitle" className="sr-only">Project Title</label>
              <input
                id="projectTitle" name="projectTitle" type="text" required
                value={formData.projectTitle} onChange={handleInputChange}
                placeholder="PROJECT TITLE"
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-cyan-400 outline-none text-sm text-slate-100 placeholder:text-slate-500 font-semibold tracking-widest transition-colors"
              />
            </div>
            <div>
              <label htmlFor="category" className="sr-only">Project Category</label>
              <select
                id="category" name="category" required
                value={formData.category} onChange={handleInputChange}
                className="w-full bg-black/60 border-b border-white/10 py-3 focus:border-cyan-400 outline-none text-sm font-semibold tracking-widest transition-colors appearance-none cursor-pointer"
                style={{ color: formData.category ? "#e2e8f0" : "#64748b" }}
              >
                <option value="" disabled>PROJECT CATEGORY</option>
                <option value="film" className="text-white bg-[#0a0a0a]">SHORT FILM</option>
                <option value="game" className="text-white bg-[#0a0a0a]">VIDEO GAME</option>
                <option value="doc" className="text-white bg-[#0a0a0a]">DOCUMENTARY</option>
                <option value="show" className="text-white bg-[#0a0a0a]">SHOW PILOT / SERIES</option>
              </select>
            </div>
            <div>
              <label htmlFor="footage" className="sr-only">Link to footage</label>
              <input
                id="footage" name="footage" type="url" required
                value={formData.footage} onChange={handleInputChange}
                placeholder="LINK TO FOOTAGE (VIMEO / DRIVE)"
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-cyan-400 outline-none text-sm text-slate-100 placeholder:text-slate-500 font-semibold tracking-widest transition-colors"
              />
            </div>
            <div>
              <label htmlFor="vibe" className="sr-only">Describe the vibe / story</label>
              <textarea
                id="vibe" name="vibe" rows={3}
                value={formData.vibe} onChange={handleInputChange}
                placeholder="DESCRIBE THE VIBE / STORY"
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-cyan-400 outline-none text-sm text-slate-100 placeholder:text-slate-500 font-semibold tracking-widest resize-none transition-colors"
              />
            </div>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleContinueToPayment}
                disabled={!isFormValid}
                className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 disabled:bg-white/10 disabled:text-slate-500 disabled:cursor-not-allowed text-black font-black uppercase tracking-[0.2em] text-sm rounded-lg transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Pay via PayPal */}
        {step === "pay" && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-3">Your Submission</p>
              <p className="text-white font-bold">{formData.projectTitle}</p>
              <p className="text-slate-400 text-sm">{categoryLabels[formData.category]} &mdash; {formData.name}</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Click the button below to pay your <span className="text-cyan-400 font-bold">$5 entry fee</span> via PayPal. It will open in a new tab. Once payment is complete, return here to confirm and finalize your submission.
              </p>
              <div className="flex justify-center mb-6">
                <form
                  action="https://www.paypal.com/ncp/payment/4ZCXGAS75CST6"
                  method="post"
                  target="_blank"
                  className="inline-grid justify-items-center gap-2"
                >
                  <input
                    type="submit"
                    value="Pay $5 via PayPal"
                    className="text-center border-none rounded min-w-[11.625rem] px-8 h-[2.625rem] font-bold bg-[#FFD140] text-black text-base cursor-pointer hover:bg-[#f5c831] transition-colors"
                  />
                  <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="Accepted payment methods" />
                  <span className="text-xs text-slate-500">
                    Powered by{" "}
                    <img
                      src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg"
                      alt="PayPal"
                      className="h-3.5 inline align-middle"
                    />
                  </span>
                </form>
              </div>
              <button
                type="button"
                onClick={handleIHavePaid}
                className="w-full py-3 border border-cyan-400/40 hover:border-cyan-400 text-cyan-400 font-black uppercase tracking-[0.2em] text-sm rounded-lg transition-colors"
              >
                I&apos;ve Completed Payment
              </button>
            </div>

            <button
              type="button"
              onClick={() => setStep("form")}
              className="w-full text-xs text-slate-500 hover:text-slate-300 transition-colors py-2"
            >
              Back to project details
            </button>
          </div>
        )}

        {/* Step 3: Confirm payment */}
        {step === "confirm" && (
          <div className="space-y-6">
            <div className="bg-cyan-400/5 border border-cyan-400/20 rounded-xl p-5 text-center">
              <p className="text-cyan-400 font-black uppercase tracking-widest text-sm mb-1">Almost there</p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Please confirm your PayPal payment was successful before we lock in your entry.
              </p>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg">{error}</p>
            )}

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={paymentConfirmed}
                onChange={(e) => {
                  setPaymentConfirmed(e.target.checked)
                  setError("")
                }}
                className="mt-0.5 w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                I confirm I have completed the <span className="text-cyan-400 font-semibold">$5 PayPal payment</span> for my submission of <span className="text-white font-semibold">{formData.projectTitle}</span>.
              </span>
            </label>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!paymentConfirmed || isSubmitting}
              className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 disabled:bg-white/10 disabled:text-slate-500 disabled:cursor-not-allowed text-black font-black uppercase tracking-[0.2em] text-sm rounded-lg transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit My Entry"}
            </button>

            <button
              type="button"
              onClick={() => setStep("pay")}
              className="w-full text-xs text-slate-500 hover:text-slate-300 transition-colors py-2"
            >
              Back to payment
            </button>
          </div>
        )}

        {/* Step 4: Success */}
        {step === "done" && (
          <div className="text-center py-8">
            <p
              className="text-4xl font-black uppercase tracking-[-0.02em] text-white mb-3"
              style={{ textShadow: "0 0 30px rgba(0, 200, 255, 0.5)" }}
            >
              You&apos;re In.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your submission has been received. Drawing takes place May 3, 2026 &mdash; we&apos;ll be in touch.
            </p>
            <div className="bg-gradient-to-r from-cyan-400/10 to-cyan-400/5 border border-cyan-400/30 rounded-lg p-4">
              <p className="text-xs text-cyan-300 uppercase tracking-widest font-semibold mb-2">What&apos;s Next</p>
              <p className="text-sm text-slate-300">
                Winners will be announced on <span className="text-cyan-400 font-bold">May 3, 2026</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
