const GenerateExcelHelper = require('../helpers/generate-excel.helper');

class PaymentReportService {
    generateExcelHelper;

    constructor() {
        this.generateExcelHelper = new GenerateExcelHelper();
    }

    generateReport = async ({ data }) => {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    generateReportLink = async ({ data }) => {
        try {
            const report = await this.generateReport();
            const excelLink = this.generateExcelHelper.convertToExcel(report);
            return excelLink;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PaymentReportService;