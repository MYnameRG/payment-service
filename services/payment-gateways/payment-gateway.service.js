const RazorpayService = require('./razorpay.service');

class PaymentGatewayService {
    PAYMENT_GATEWAY_TYPE;
    RazorpayService;

    constructor(PAYMENT_GATEWAY_TYPE) {
        this.PAYMENT_GATEWAY_TYPE = PAYMENT_GATEWAY_TYPE;
        this.RazorpayService = new RazorpayService();
    }

    createOrder = async ({ amount, currency }) => {
        try {
            let order_received = null;
            if (this.PAYMENT_GATEWAY_TYPE === 'razorpay') {
                order_received = await this.RazorpayService.createOrder({ amount, currency });
                return order_received;
            } else {
                throw new Error('Invalid payment provider.');
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    fetchPayments = async () => {
        try {
            const payments = await this.RazorpayService.fetchPayments();
            return payments;
        } catch (error) {
            throw new Error(error);
        }
    }

    verifyPayment = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
        try {
            let isValid = false;
            if (this.PAYMENT_GATEWAY_TYPE === 'razorpay') {
                isValid = await this.RazorpayService.verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature });
                return isValid;
            } else {
                throw new Error('Invalid payment provider.');
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = PaymentGatewayService;