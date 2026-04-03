"use client"

import { useState, useRef } from "react"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzvbvqr"

interface FormData {
  name: string
  email: string
  projectTitle: string
  category: string
  footage: string
  vibe: string
}

function PayPalButtonWrapper({ 
  isFormValid, 
  isSubmitting, 
  paymentCompleted, 
  createOrder, 
  onApprove, 
  onError 
}: { 
  isFormValid: boolean
  isSubmitting: boolean
  paymentCompleted: boolean
  createOrder: () => Promise<string>
  onApprove: (data: { orderID: string }) => Promise<void>
  onError: (err: unknown) => void
}) {
  const [{ isPending, isRejected }] = usePayPalScriptReducer()

  if (isPending) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  if (isRejected) {
    return (
      <div className="text-center py-4 bg-amber-400/10 rounded-lg">
        <p className="text-amber-400 text-sm">Failed to load PayPal. Please refresh the page.</p>
      </div>
    )
  }

  return (
    <div className={`${!isFormValid ? "opacity-50 pointer-events-none" : ""}`}>
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "pay",
          height: 45,
        }}
        disabled={!isFormValid || isSubmitting || paymentCompleted}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </div>
  )
}

export function SubmitForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    projectTitle: "",
    category: "",
    footage: "",
    vibe: "",
  })
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [transactionId, setTransactionId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const isPayPalConfigured = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID && process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID !== "sb"

  const categoryLabels: Record<string, string> = {
    film: "Short Film",
    game: "Video Game",
    doc: "Documentary",
    show: "Show Pilot / Series",
  }

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

  const createOrder = async () => {
    const response = await fetch("/api/paypal/create-order", {
      method: "POST",
    })
    const data = await response.json()
    if (data.error) {
      throw new Error(data.error)
    }
    return data.orderId
  }

  const onApprove = async (data: { orderID: string }) => {
    const response = await fetch("/api/paypal/capture-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: data.orderID }),
    })
    const captureData = await response.json()

    if (captureData.success) {
      setTransactionId(captureData.transactionId)
      setPaymentCompleted(true)
      await submitToFormspree(captureData.transactionId)
    } else {
      setError("Payment verification failed. Please try again.")
    }
  }

  const submitToFormspree = async (txnId: string) => {
    setIsSubmitting(true)
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectTitle: formData.projectTitle,
          category: categoryLabels[formData.category] || formData.category,
          footageLink: formData.footage,
          description: formData.vibe || "Not provided",
          paypalTransactionId: txnId,
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        setError("Submission failed. Please contact support with your transaction ID: " + txnId)
      } else {
        setSuccess(true)
      }
    } catch {
      setError("Submission failed. Please contact support with your transaction ID: " + txnId)
    } finally {
      setIsSubmitting(false)
    }
  }

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
          className="text-3xl font-black mb-4 text-center uppercase tracking-[0.12em] text-white"
          style={{ textShadow: "0 0 30px rgba(0,200,255,0.2)" }}
        >
          Submit Your Project
        </h2>

        {/* Deadline Banner */}
        <div className="bg-gradient-to-r from-cyan-400/10 to-cyan-400/5 border border-cyan-400/30 rounded-lg p-4 mb-8 text-center">
          <p className="text-xs text-cyan-300 uppercase tracking-widest font-semibold mb-1">Submission Deadline</p>
          <p className="text-lg font-black text-cyan-400">April 30, 2026</p>
          <p className="text-xs text-slate-400 mt-1">Drawing Date: May 3, 2026</p>
        </div>

        {success ? (
          <div className="text-center py-8">
            <p
              className="text-4xl font-black uppercase tracking-[-0.02em] text-white mb-3"
              style={{ textShadow: "0 0 30px rgba(0, 200, 255, 0.5)" }}
            >
              You&apos;re In.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your submission has been received. Drawing takes place May 3, 2026 — we&apos;ll be in touch.
            </p>
            {transactionId && (
              <p className="text-xs text-slate-500 mb-4">
                Transaction ID: <span className="text-cyan-400">{transactionId}</span>
              </p>
            )}
            <div className="bg-gradient-to-r from-cyan-400/10 to-cyan-400/5 border border-cyan-400/30 rounded-lg p-4">
              <p className="text-xs text-cyan-300 uppercase tracking-widest font-semibold mb-2">What&apos;s Next</p>
              <p className="text-sm text-slate-300">
                Winners will be announced on <span className="text-cyan-400 font-bold">May 3, 2026</span>
              </p>
            </div>
          </div>
        ) : (
          <form ref={formRef} className="space-y-5">
            {error && (
              <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg">{error}</p>
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
                value={formData.name}
                onChange={handleInputChange}
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
                value={formData.email}
                onChange={handleInputChange}
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
                value={formData.projectTitle}
                onChange={handleInputChange}
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
                value={formData.category}
                onChange={handleInputChange}
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
                value={formData.footage}
                onChange={handleInputChange}
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
                value={formData.vibe}
                onChange={handleInputChange}
                placeholder="DESCRIBE THE VIBE / STORY"
                className="w-full bg-transparent border-b border-white/10 py-3 focus:border-cyan-400 outline-none text-sm text-slate-100 placeholder:text-slate-500 font-semibold tracking-widest resize-none transition-colors"
              />
            </div>

            {/* PayPal Payment Section */}
            <div className="border-t border-white/5 pt-6 mt-6">
              <p className="text-[11px] text-slate-400 text-center mb-4 uppercase tracking-[0.35em] font-semibold">
                Pay $5 via PayPal to submit
              </p>

              {!isFormValid && (
                <p className="text-xs text-amber-400 text-center mb-4 bg-amber-400/10 py-2 rounded-lg">
                  Please fill in all required fields above to enable payment
                </p>
              )}

              {!isPayPalConfigured ? (
                <div className="text-center py-4 bg-amber-400/10 rounded-lg">
                  <p className="text-amber-400 text-sm">PayPal is not configured. Please add your PayPal credentials.</p>
                </div>
              ) : (
                <PayPalButtonWrapper
                  isFormValid={isFormValid}
                  isSubmitting={isSubmitting}
                  paymentCompleted={paymentCompleted}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={(err) => {
                    console.error("[v0] PayPal error:", err)
                    setError("Payment failed. Please try again.")
                  }}
                />
              )}

              {isSubmitting && (
                <p className="text-cyan-400 text-sm text-center mt-4 flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting your entry...
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
