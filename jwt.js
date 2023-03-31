const hash = require("./hash");
const salt = require("./config/secrets")

class Jwt {
  generateToken(payload, salt) {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const expiresIn = payload.exp || '1h';
    const expiryDate = Math.floor(Date.now() / 1000) + expiresIn;

    const tokenPayload = { ...payload, exp: expiryDate };

    const base64UrlHeader = Buffer.from(JSON.stringify(header)).toString('base64')
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    const base64UrlPayload = Buffer.from(JSON.stringify(tokenPayload)).toString('base64')
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    const signature = hash.sha1(`${base64UrlHeader}.${base64UrlPayload}`, salt);

    return `${base64UrlHeader}.${base64UrlPayload}.${signature}`;
  }

  verifyToken(token, salt) {
    const [headerEncoded, payloadEncoded, signatureEncoded] = token.split('.');
    const payload = JSON.parse(Buffer.from(payloadEncoded, 'base64').toString());

    const expectedSignature = hash.sha1(`${headerEncoded}.${payloadEncoded}`, salt);

    if (signatureEncoded === expectedSignature && Math.floor(Date.now() / 1000) < payload.exp) {
      return payload;
    } else {
      throw new Error('Invalid token signature');
    }
  }
}

module.exports = new Jwt();
