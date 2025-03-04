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

  createPayment = async ({ amount, currency = 'INR', email = "test@example.com", contact = "9999999999", order_id, method = "upi", vpa }) => {
    try {
      const payment = this.RazorpayClient.payments({
        amount: amount,
        currency: currency,
        email: email,
        contact: contact,
        order_id: order_id,
        method: method,
        vpa: (method == 'upi') ? vpa : null
      });
  
      return payment;
    } catch(e) {
      console.log(e)
      throw new Error({ ...e });
    }
  }

  verifyPayment = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    return generatedSignature === razorpay_signature;
  }
}

module.exports = RazorpayService;