// /api/create-razorpay-qr
import axios from "axios";

export default async function handler(req, res) {
  const { orderId } = req.body;

  try {
    const response = await axios.post(
      `https://api.razorpay.com/v1/payments/qr_codes/${orderId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `rzp_test_5nVjl1yDsQjHtS:6YoDpCeLv0WhwaH662GWbRLT`
          ).toString("base64")}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error creating Razorpay QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code." });
  }
}
