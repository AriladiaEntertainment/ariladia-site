import { NextRequest, NextResponse } from "next/server"

const PAYPAL_API_BASE = "https://api-m.sandbox.paypal.com"

async function getAccessToken(): Promise<string> {
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

  if (!response.ok) {
    throw new Error("Failed to get PayPal access token")
  }

  const data = await response.json()
  return data.access_token
}

async function getTransactionDetails(transactionId: string, accessToken: string) {
  const response = await fetch(`${PAYPAL_API_BASE}/v1/reporting/transactions?transaction_id=${transactionId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch transaction details")
  }

  return response.json()
}

export async function POST(request: NextRequest) {
  try {
    const { transactionId } = await request.json()

    if (!transactionId) {
      return NextResponse.json({ success: false, error: "Transaction ID is required" }, { status: 400 })
    }

    const accessToken = await getAccessToken()
    const transactionData = await getTransactionDetails(transactionId, accessToken)

    // Check if transaction exists and has transactions
    if (!transactionData.transaction_details || transactionData.transaction_details.length === 0) {
      return NextResponse.json({ success: false, error: "Transaction not found" }, { status: 404 })
    }

    const transaction = transactionData.transaction_details[0]

    // Verify the transaction is completed and for $5.00
    const isCompleted = transaction.transaction_status === "S" // S = Success
    const isCorrectAmount = parseFloat(transaction.transaction_amount) === 5.0
    const isCurrency = transaction.transaction_currency === "USD"

    if (!isCompleted || !isCorrectAmount || !isCurrency) {
      console.error("[v0] Transaction verification failed", {
        isCompleted,
        isCorrectAmount,
        isCurrency,
        amount: transaction.transaction_amount,
        status: transaction.transaction_status,
      })
      return NextResponse.json(
        { success: false, error: "Transaction verification failed. Please check the amount and try again." },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      transactionId: transaction.transaction_id,
      amount: transaction.transaction_amount,
      currency: transaction.transaction_currency,
      timestamp: transaction.transaction_initiation_date,
    })
  } catch (error) {
    console.error("[v0] Payment verification error:", error)
    return NextResponse.json(
      { success: false, error: "Payment verification failed. Please try again or contact support." },
      { status: 500 }
    )
  }
}
