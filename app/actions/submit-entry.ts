"use server"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzvbvqr"

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

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        projectTitle,
        category: categoryLabels[projectType] || projectType,
        footageLink: projectLink,
        description: description || "Not provided",
        paypalTransactionId: transactionId,
        submittedAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      return { success: false, error: "Submission failed. Please try again." }
    }

    return { success: true }
  } catch (err) {
    console.error("[v0] Formspree error:", err)
    return { success: false, error: "Submission failed. Please try again." }
  }
}
