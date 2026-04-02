"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export type SubmitEntryState = {
  success: boolean
  error?: string
}

export async function submitEntry(
  _prevState: SubmitEntryState,
  formData: FormData
): Promise<SubmitEntryState> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const projectTitle = formData.get("projectTitle") as string
  const projectType = formData.get("category") as string
  const projectLink = formData.get("footage") as string
  const description = formData.get("vibe") as string
  const transactionId = formData.get("transactionId") as string

  if (!name || !email || !projectTitle || !projectType || !projectLink || !transactionId) {
    return { success: false, error: "Please fill in all required fields and provide your transaction ID." }
  }

  const categoryLabels: Record<string, string> = {
    film: "Short Film",
    game: "Video Game",
    doc: "Documentary",
    show: "Show Pilot / Series",
  }

  const emailContent = `
New REFORCEMENT Submission

Submitter Details:
- Name: ${name}
- Email: ${email}

Project Details:
- Title: ${projectTitle}
- Category: ${categoryLabels[projectType] || projectType}
- Footage Link: ${projectLink}
- Description: ${description || "Not provided"}

Payment:
- PayPal Transaction ID: ${transactionId}

Submitted on: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}
  `.trim()

  try {
    const { error } = await resend.emails.send({
      from: "REFORCEMENT <onboarding@resend.dev>",
      to: "Ariladia.entertainment@gmail.com",
      subject: `New Submission: ${projectTitle} by ${name}`,
      text: emailContent,
    })

    if (error) {
      console.error("[v0] Email send error:", error)
      return { success: false, error: "Submission failed. Please try again." }
    }

    return { success: true }
  } catch (err) {
    console.error("[v0] Email error:", err)
    return { success: false, error: "Submission failed. Please try again." }
  }
}
