const generateJWE = require("./src/generateJWE");
const generateJWS = require("./src/generateJWS");
const generateJWEAndJWS = require("./src/generateJWEAndJWS");
const generateDigest = require("./src/generateDigest");
const {
  validateGenerateJWEParams,
  validateGenerateJWSParams,
  validateGenerateDigestParams,
} = require("./utils/validate");

exports.generateJWE = async params => {
  validateGenerateJWEParams(params);
  return await generateJWE(params);
};

exports.generateJWS = async params => {
  validateGenerateJWSParams(params);
  return await generateJWS(params);
};

exports.generateJWEAndJWS = generateJWEAndJWS;

exports.generateDigest = async params => {
  validateGenerateDigestParams(params);
  return generateDigest(params);
};
