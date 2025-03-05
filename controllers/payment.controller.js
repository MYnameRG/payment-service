const PaymentGatewayService = require('../services/payment-gateways/payment-gateway.service');
const EmailService = require('../services/emails/email.service');

class PaymentController {
    PaymentGatewayService;
    EmailService;

    constructor() {
        this.PaymentGatewayService = new PaymentGatewayService('razorpay');
        this.EmailService = new EmailService(process.env.ETHERAL_USERNAME, process.env.ETHERAL_PASSWORD);
    }

    createOrder = async (req, res) => {
        try {
            const { amount, currency } = req.body;
            const order = await this.PaymentGatewayService.createOrder({ amount, currency });

            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({ error: { ...error } });
        }
    }

    verifyPayments = async (req, res) => {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
            const isValid = this.PaymentGatewayService.verifyPayment({
                razorpay_order_id, razorpay_payment_id, razorpay_signature
            });

            if (isValid) {
                const template = this.EmailService.renderTemplate({ data: null });
                this.EmailService.sendMail({ html: template });
                return res.status(200).json({ success: true, message: 'Payment verified successfully!' });
            } else {
                return res.status(400).json({ success: false, message: 'Payment verification failed!' });
            }
        } catch (error) {
            return res.status(500).json({ error: { ...error } });
        }
    }
}

module.exports = PaymentController;