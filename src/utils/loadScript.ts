export function loadscript(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

export async function initializeRazorpay(): Promise<boolean> {
  const res = await loadscript("https://checkout.razorpay.com/v1/checkout.js")
  return res;
}

export function generateUPIQRCode(paymentDetails: { orderId: string; amount: number }) {
  const baseURL = "https://api.razorpay.com/v1/payments/qr_codes"
  const qrURL = `${baseURL}/${paymentDetails.orderId}`
  return qrURL
}

