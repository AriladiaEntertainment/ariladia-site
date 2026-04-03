import { NextRequest, NextResponse } from "next/server"

// Use sandbox for testing - change to "https://api-m.paypal.com" for production live payments
const PAYPAL_API_BASE = "https://api-m.sandbox.paypal.com"

async function getAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials not configured")
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()

    if (!orderId) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 })
    }

    const accessToken = await getAccessToken()

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const capture = await response.json()

    if (!response.ok) {
      console.error("[v0] PayPal capture error:", capture)
      return NextResponse.json({ error: "Failed to capture payment" }, { status: 500 })
    }

    const transactionId = capture.purchase_units?.[0]?.payments?.captures?.[0]?.id || orderId

    return NextResponse.json({
      success: true,
      transactionId,
      status: capture.status,
    })
  } catch (error) {
    console.error("[v0] PayPal capture error:", error)
    return NextResponse.json({ error: "Failed to capture payment" }, { status: 500 })
  }
}
