const RazorpayIntegration = require('../../integrations/razorpay.integration');
const crypto = require('crypto');

class RazorpayService {
  RazorpayIntegration;

  constructor() {
    const Razorpay = new RazorpayIntegration(process.env.RAZORPAY_KEY, process.env.RAZORPAY_KEY_SECRET);
    this.RazorpayClient = Razorpay.getGatewayClient();
  }

  createOrder = async ({ amount, currency = 'INR' }) => {
    try {
      const order = await this.RazorpayClient.orders.create({
        amount: amount * 100, // Convert INR to paise
        currency,
        receipt: `order_rcptid_${Math.floor(Math.random() * 1000)}`
      });

      return order;
    } catch (e) {
      throw new Error(e);
    }
  }

  fetchPayments = async () => {
    try {
      const payments = this.RazorpayClient.payments.all();
      return payments;
    } catch (e) {
      throw new Error(e);
    }
  }

  verifyPayment = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    try {
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      return generatedSignature === razorpay_signature;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = RazorpayService;