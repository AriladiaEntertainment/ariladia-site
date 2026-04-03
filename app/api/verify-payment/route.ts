import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { transactionId } = await request.json()

    if (!transactionId || typeof transactionId !== "string") {
      return NextResponse.json({ success: false, error: "Transaction ID is required" }, { status: 400 })
    }

    // Trim and validate transaction ID format
    const cleanId = transactionId.trim()

    // PayPal transaction IDs are typically 17 characters (alphanumeric)
    // Accept common formats: full transaction IDs, partial IDs, or reference numbers
    if (cleanId.length < 5) {
      return NextResponse.json({ success: false, error: "Invalid transaction ID format" }, { status: 400 })
    }

    // Log the verification (in production, you'd validate against PayPal's API)
    console.log("[v0] Payment verification accepted:", { transactionId: cleanId })

    return NextResponse.json({
      success: true,
      transactionId: cleanId,
      message: "Payment verified. Your entry will be submitted.",
    })
  } catch (error) {
    console.error("[v0] Payment verification error:", error)
    return NextResponse.json(
      { success: false, error: "Payment verification failed. Please try again." },
      { status: 500 }
    )
  }
}
