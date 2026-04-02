"use server"

import { createClient } from "@/lib/supabase/server"

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

  const supabase = await createClient()

  const { error } = await supabase.from("submissions").insert({
    name,
    email,
    project_title: projectTitle,
    project_type: projectType,
    project_link: projectLink,
    description: description || null,
    payment_confirmed: true,
    paypal_transaction_id: transactionId,
  })

  if (error) {
    console.error("[v0] Supabase insert error:", error)
    return { success: false, error: "Submission failed. Please try again." }
  }

  return { success: true }
}
