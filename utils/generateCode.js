const voucher_codes = require('voucher-code-generator');

module.exports ={
    generatecode: () => voucher_codes.generate({prefix: "nike-", length: 8, postfix: "-promo"})
}