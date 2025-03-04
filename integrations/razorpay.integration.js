const Razorpay = require('razorpay');

class RazorpayIntegration {
    API_KEY;
    API_SECRET_KEY;

    constructor(API_KEY, API_SECRET_KEY) {
        this.API_KEY = API_KEY;
        this.API_SECRET_KEY = API_SECRET_KEY;
    }

    getGatewayClient = () => {
        return new Razorpay({
            key_id: this.API_KEY,
            key_secret: this.API_SECRET_KEY
        });
    }
}

module.exports = RazorpayIntegration;