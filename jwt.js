const crypto = require("crypto");

class Jwt {
  generateToken(payload, secret, options) {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const expiresIn = options.expiresIn || '1h';
    const expiryDate = Math.floor(Date.now() / 1000) + expiresIn;

    const tokenPayload = { ...payload, exp: expiryDate };

    const base64UrlHeader = Buffer.from(JSON.stringify(header)).toString('base64')
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    const base64UrlPayload = Buffer.from(JSON.stringify(tokenPayload)).toString('base64')
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    const signature = crypto.createHmac('sha256', secret).update(`${base64UrlHeader}.${base64UrlPayload}`).digest('base64')
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    return `${base64UrlHeader}.${base64UrlPayload}.${signature}`;
  }

  verifyToken(token, secret) {
    const [headerEncoded, payloadEncoded, signatureEncoded] = token.split('.');

    const payload = JSON.parse(Buffer.from(payloadEncoded, 'base64').toString());

    const expectedSignature = crypto.createHmac('sha256', secret).update(`${headerEncoded}.${payloadEncoded}`).digest('base64')
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    if (signatureEncoded === expectedSignature && Math.floor(Date.now() / 1000) < payload.exp) {
      return payload;
    } else {
      throw new Error('Invalid token signature');
    }
  }
}

module.exports = new Jwt();
