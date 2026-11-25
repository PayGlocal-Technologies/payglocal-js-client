const crypto = require("node:crypto");
const { GET_METHOD } = require("../utils/constants");

/**
 * Selects the input that has to be signed
 * GET -> request URI path (including query string if present)
 * POST / PUT -> exact raw request body
 */
const getSigningInput = ({ httpMethod, requestUri, payload }) =>
  httpMethod.toUpperCase() === GET_METHOD ? requestUri : payload;

/**
 * Generates the digest to send in the x-gl-digest header (API Key + HMAC-SHA256 authentication,
 * used by the Partner Merchant Onboarding APIs). The API Key goes in the x-gl-auth header.
 * Adding the headers to the request is left to the caller.
 *
 * @param {String} httpMethod HTTP method of the request: GET, POST or PUT (required)
 * @param {String} requestUri request URI path including the query string if present, no host or scheme,
 *                            e.g. /gcc/v2/partner/merchant/onboard/business-category (required for GET)
 * @param {String} payload exact raw request body (json stringified), as sent on the wire (required for POST / PUT)
 * @param {String} apiSecret API Secret from the PayGlocal Partner Dashboard, never the API Key (required)
 * @returns {String} Base64 encoded HmacSHA256 digest
 */
module.exports = ({ httpMethod, requestUri, payload, apiSecret }) =>
  crypto
    .createHmac("sha256", apiSecret)
    .update(getSigningInput({ httpMethod, requestUri, payload }), "utf8")
    .digest("base64");

module.exports.getSigningInput = getSigningInput;
