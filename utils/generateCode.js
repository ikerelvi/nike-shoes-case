const voucher_codes = require('voucher-code-generator');

/**
 * Function that returns a autogenerated voucher code
 * @return {Array} with the code that follows the format nike-8 length alfanumeric value -promo
 */

module.exports ={
    generatecode: () => voucher_codes.generate({prefix: "nike-", length: 8, postfix: "-promo"})
}