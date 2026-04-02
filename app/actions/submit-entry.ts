"use server"

import { createClient } from "@/lib/supabase/server"
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

  if (!name || !email || !projectTitle || !projectType || !projectLink) {
    return { success: false, error: "Please fill in all required fields." }
  }

  const supabase = await createClient()

  const { error } = await supabase.from("submissions").insert({
    name,
    email,
    project_title: projectTitle,
    project_type: projectType,
    project_link: projectLink,
    description: description || null,
    payment_confirmed: false,
  })

  if (error) {
    console.error("[v0] Supabase insert error:", error)
    return { success: false, error: "Submission failed. Please try again." }
  }

  // Send email notification
  try {
    await resend.emails.send({
      from: "REFORCEMENT <onboarding@resend.dev>",
      to: "ariladia.entertainment@gmail.com",
      subject: `New Submission: ${projectTitle}`,
      html: `
        <h2>New Lottery Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Title:</strong> ${projectTitle}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Project Link:</strong> <a href="${projectLink}">${projectLink}</a></p>
        <p><strong>Description:</strong> ${description || "N/A"}</p>
        <p><em>Payment Confirmed: No</em></p>
      `,
    })
  } catch (emailError) {
    console.error("[v0] Email send error:", emailError)
    // Don't fail the submission if email fails
  }

  return { success: true }
}
