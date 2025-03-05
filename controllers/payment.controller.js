const PaymentGatewayService = require('../services/payment-gateways/payment-gateway.service');
const EmailService = require('../services/emails/email.service');
const PaymentReportService = require('../services/payment-report.service');

class PaymentController {
    PaymentGatewayService;
    PaymentReportService;
    EmailService;

    constructor() {
        this.PaymentReportService = new PaymentReportService();
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

    generatePaymentsExcel = async (req, res) => {
        try {
            const payments = await this.PaymentGatewayService.fetchPayments();
            if (payments.length == 0) return res.status(400).json({ success: false, message: 'No Payments are done.' });

            const reportLink = this.PaymentReportService.generateReportLink({ data: payments });
            if (reportLink) return res.status(400).json({ success: false, message: 'No Link is generated.' });

            return res.status(200).json({ success: true, message: 'Excel file generated successfully!' });
        } catch (error) {
            return res.status(500).json({ error: { ...error } });
        }
    }
}

module.exports = PaymentController;